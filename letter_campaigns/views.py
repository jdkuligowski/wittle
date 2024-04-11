from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny

from datetime import timedelta
from django.utils import timezone
from datetime import datetime
import pytz
import requests
import environ
import logging
from django.utils.timezone import make_aware
import json
from django.contrib.auth import get_user_model

User = get_user_model()


from .models import Campaigns
from campaign_tracking.models import Tracker
from letter_templates.models import Templates
from letter_templates.serializers.common import TemplateSerializer
from .serializers.common import CampaignSerializer
from django.http import Http404

env = environ.Env()
AZURE_FUNCTION_URL = env('AZURE_FUNCTION_URL')
SECRET_TOKEN = env('AZURE_WEBHOOK_SECRET')


class GetAllCampaigns(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        campaigns = Campaigns.objects.filter(owner=request.user)
        serializer = CampaignSerializer(campaigns, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCampaign(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CampaignSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GetSingleCampaign(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Campaigns.objects.get(pk=pk, owner=user)
        except Campaigns.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        campaign = self.get_object(pk, request.user)
        serializer = CampaignSerializer(campaign)
        return Response(serializer.data)



class EditCampaign(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Campaigns.objects.get(pk=pk, owner=user)
        except Campaigns.DoesNotExist:
            return Response({'error': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        campaign = self.get_object(pk, request.user)
        serializer = CampaignSerializer(campaign, data=request.data, partial=True) # `partial=True` allows for partial updates
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCampaign(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, campaign_id):
        try:
            # Attempt to find the template by its ID and owner
            template = Campaigns.objects.get(id=campaign_id, owner=request.user)
        except Campaigns.DoesNotExist:
            # If the template does not exist, return a 404 Not Found response
            raise Http404

        # If the template is found, delete it
        template.delete()
        
        # Return a 204 No Content response to indicate successful deletion
        return Response(status=status.HTTP_204_NO_CONTENT)




class CampaignProcessingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print('starting process->', request.data)
        campaign_details = request.data.get('campaign')
        items = request.data.get('sequence_details')

        try:
            campaign = Campaigns.objects.get(id=campaign_details['id'])
            print('fetched campaign details')
        except Campaigns.DoesNotExist:
            return Response({'error': 'Campaign not found'}, status=status.HTTP_404_NOT_FOUND)

        for item in items:
            step = item.get('step', 1)
            if step == 1:  # Immediate send
                scheduled_date = make_aware(datetime.now())

                response = self.call_logic_app(item, campaign, scheduled_date)
                if response.status_code == 200:
                    azure_response_data = response.json()
                    print('azure response ->',azure_response_data)
                    # body_data = json.loads(azure_response_data['body'])

                    # pdf_url = body_data['data']['pdf']
                    pdf_url = azure_response_data['pdf']

                    send_status = azure_response_data['status']


                    self.update_tracker(campaign, item, step, request.user, pdf_url, send_status, scheduled_date)
                else:
                    return Response({'error': 'Failed to process item', 'details': response.text}, status=response.status_code)
            else:
                scheduled_date = self.calculate_scheduled_date(campaign, step)
                response = self.call_logic_app(item, campaign, scheduled_date)
                
                if response.status_code == 200:
                    azure_response_data = response.json()
                    print('azure response ->',azure_response_data)
                    pdf_url = azure_response_data['pdf']
                    send_status = azure_response_data['status']

                    self.update_tracker(campaign, item, step, request.user, pdf_url, send_status, scheduled_date)
                else:
                    return Response({'error': 'Failed to process item', 'details': response.text}, status=response.status_code)


        campaign.campaign_status = 'Live'
        campaign.save()
        return Response({'message': 'Campaign processing initiated'}, status=status.HTTP_200_OK)

    def calculate_scheduled_date(self, campaign, step):
        # Get the date value from the campaign model dynamically based on step
        days_since_start = getattr(campaign, f'template_{step}_date', 0) or 0
        # scheduled_date = make_aware(datetime.now()) + timedelta(days=float(days_since_start))
        # return scheduled_date
        scheduled_date = make_aware(datetime.now()) + timedelta(days=days_since_start)
        return scheduled_date
        


    def call_logic_app(self, item, campaign, scheduled_date):
        try:
            print('calling azure logic app')
            logic_app_url = 'https://letter-sending-logicapp.azurewebsites.net:443/api/create-pdf-send-letter/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=OHRqUeWC22nD35cmpEy5WBJchc5Z2bdCyP8hp8JNdNk'  # Replace with your Logic App HTTP trigger URL

            # Ensure the datetime is in UTC before formatting
            if scheduled_date.tzinfo is not None:
                # If the datetime is timezone-aware, convert it to UTC
                utc_scheduled_date = scheduled_date.astimezone(pytz.UTC)
            else:
                # If the datetime is naive, assume it's already in UTC
                utc_scheduled_date = scheduled_date

            # Format the datetime object to a string in ISO 8601 format
            formatted_date = utc_scheduled_date.strftime('%Y-%m-%dT%H:%M:%SZ')

            data = {
                "htmlContent": item['htmlContent'],
                "campaignName": campaign.campaign_name,
                "templateName": item['template_name'],
                "address": item['recipient'],
                "step": item.get('step', 1),
                "scheduled_date": formatted_date
            }
            print('structured data to send to Logic App ->', data)
            headers = {'Content-Type': 'application/json'}
            response = requests.post(logic_app_url, json=data, headers=headers)
            response.raise_for_status()  # This will raise an HTTPError for bad responses
            return response
        except requests.HTTPError as http_err:
            # HTTP error occurred
            logging.error(f'HTTP error calling Azure Function: {http_err}; Response: {response.text}')
            # Handle HTTP error as needed or re-raise with more information
            raise
        except Exception as err:
            # Other errors (e.g., network issues)
            logging.error(f'Error calling Azure Function: {err}')
            # Handle general error as needed or re-raise
            raise

    def update_tracker(self, campaign, item, step, user, pdf_url, send_status, scheduled_date):
        
        print('updating tracker')
        # Ensure the datetime is in UTC before formatting
        if scheduled_date.tzinfo is not None:
                # If the datetime is timezone-aware, convert it to UTC
            utc_scheduled_date = scheduled_date.astimezone(pytz.UTC)
        else:
                # If the datetime is naive, assume it's already in UTC
            utc_scheduled_date = scheduled_date

        # Format the datetime object to a string in ISO 8601 format
        formatted_date = utc_scheduled_date.strftime('%Y-%m-%d')
        Tracker.objects.create(
            campaign_name=campaign.campaign_name,
            campaign_step=step,
            template_name=item['template_name'],
            target_address=item['recipient']['address'],
            target_name=item['recipient'].get('owner_name', ''),  # Adjust according to your data structure
            pdf=pdf_url,
            status=send_status,
            status_date=formatted_date,
            owner=user
        )
        print('tracker updated')




@method_decorator(csrf_exempt, name='dispatch')
class GetScheduledResponseWebhook(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []  # This bypasses JWT authentication for this view

    def post(self, request, *args, **kwargs):
        print('reached webhook')
        
        # Process the incoming webhook data
        webhook_data = request.data
        print("Received webhook data:", webhook_data)

        # Perform the token check after 'webhook_data' is defined
        token = request.headers.get('Authorization')
        if token != SECRET_TOKEN:
            return Response({"message": "Unauthorized"}, status=401)

        # Extract and use 'user' from 'webhook_data'
        owner_id = webhook_data.get('user')  # Ensure 'user' exists in your payload
        try:
            owner_instance = User.objects.get(pk=owner_id)
        except User.DoesNotExist:
            print("User does not exist.")
            return Response({"message": "User not found"}, status=404)
        
        # Continue processing using 'webhook_data'
        campaign_name = webhook_data.get('campaign_name')
        step = webhook_data.get('step')
        template_name = webhook_data.get('template_name')
        pdf = webhook_data.get('pdf')
        status = webhook_data.get('status')

        # Update existing Tracker instance or create a new one if it doesn't exist
        tracker, created = Tracker.objects.update_or_create(
            campaign_name=campaign_name, 
            campaign_step=step, 
            template_name=template_name,
            owner=owner_instance,
            defaults={
                'pdf': pdf,
                'status': status,
            }
        )

        # Respond to indicate successful receipt of the webhook
        return Response({"message": "Webhook data received successfully"}, status=200)