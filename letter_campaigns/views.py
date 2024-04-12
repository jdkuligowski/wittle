from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
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
from django.forms.models import model_to_dict 
# from azure.identity import DefaultAzureCredential
# from azure.mgmt.logic import LogicManagementClient
# from azure.mgmt.resource import ResourceManagementClient


User = get_user_model()

logger = logging.getLogger(__name__)

from .models import Campaigns
from campaign_tracking.models import Tracker
from letter_templates.models import Templates
from letter_templates.serializers.common import TemplateSerializer
from .serializers.common import CampaignSerializer
from django.http import Http404

env = environ.Env()
AZURE_FUNCTION_URL = env('AZURE_FUNCTION_URL')
SECRET_TOKEN = env('AZURE_WEBHOOK_SECRET')
LOGIC_SUBSCRIPTION_ID=env('LOGIC_SUBSCRIPTION_ID')
LOGIC_RESOURCE_GROUP_NAME=env('LOGIC_RESOURCE_GROUP_NAME')
LOGIC_APP_NAME=env('LOGIC_APP_NAME')
LOGIC_WORKFLOW=env('LOGIC_WORKFLOW')
AZURE_SECRET_ID=env('AZURE_SECRET_ID')
AZURE_CLIENT_ID=env('AZURE_CLIENT_ID')
AZURE_TENANT_ID=env('AZURE_TENANT_ID')

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


class DuplicateCampaignView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk, format=None):
        original_campaign = get_object_or_404(Campaigns, pk=pk, owner=request.user)  # Fetch the original campaign
        
        campaign_data = model_to_dict(original_campaign, exclude=['id', 'campaign_name', 'campaign_status', 'owner'])
        new_campaign = Campaigns(**campaign_data)
        
        # Correctly assign the owner with a User instance
        new_campaign.owner = request.user
        new_campaign.campaign_name = f"Copy_{original_campaign.campaign_name}"
        new_campaign.campaign_status = 'Not launched'
        
        new_campaign.save()
        
        print(f'New campaign created with ID: {new_campaign.pk} based on original campaign ID: {pk}')
        
        return Response({
            'message': 'Campaign duplicated successfully',
            'new_campaign_id': new_campaign.pk
        }, status=201)



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

        all_items_processed_successfully = True
        for item in items:
            step = item.get('step', 1)
            if step == 1:  # Immediate send
                scheduled_date = make_aware(datetime.now())

                response = self.call_logic_app(item, campaign, scheduled_date)
                if response.status_code == 200:
                    azure_response_data = response.json()
                    print('azure response ->',azure_response_data)
                    pdf_url = azure_response_data['pdf']
                    send_status = azure_response_data['status']
                    logic_app_id = azure_response_data['logic_app_id']

                    self.update_tracker(campaign, item, step, request.user, pdf_url, send_status, scheduled_date, logic_app_id)
                else:
                    all_items_processed_successfully = False

                    return Response({'error': 'Failed to process item', 'details': response.text}, status=response.status_code)
            else:
                scheduled_date = self.calculate_scheduled_date(campaign, step)
                response = self.call_logic_app(item, campaign, scheduled_date)
                
                if response.status_code == 200:
                    azure_response_data = response.json()
                    print('azure response ->',azure_response_data)
                    pdf_url = azure_response_data['pdf']
                    send_status = azure_response_data['status']
                    logic_app_id = azure_response_data['logic_app_id']

                    self.update_tracker(campaign, item, step, request.user, pdf_url, send_status, scheduled_date, logic_app_id)
                else:
                    all_items_processed_successfully = False
                    return Response({'error': 'Failed to process item', 'details': response.text}, status=response.status_code)


        if all_items_processed_successfully:
            # Update the campaign start date and status only if all items are processed successfully
            campaign.campaign_start_date = now().date()  # Update the start date to the current date
            campaign.campaign_status = 'Live'
            campaign.save()
            return Response({'message': 'Campaign processing initiated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Not all items could be processed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

    def update_tracker(self, campaign, item, step, user, pdf_url, send_status, scheduled_date, logic_app_id):
        
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
            target_name=item['recipient'].get('owner_name', ''),
            pdf=pdf_url,
            status=send_status,
            status_date=formatted_date,
            target_rightmove_id=item['recipient']['rightmove_id'],
            logic_app_run_id=logic_app_id,
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





# class CancelScheduledLetterView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, tracker_id):
#         tracker = get_object_or_404(Tracker, pk=tracker_id, owner=request.user)
#         if not tracker.logic_app_run_id:
#             logger.warning("No Logic App run ID associated with this tracker ID: %s", tracker_id)
#             return Response({"message": "No scheduled task found for this entry."}, status=404)

#         subscription_id = LOGIC_SUBSCRIPTION_ID
#         resource_group_name = LOGIC_RESOURCE_GROUP_NAME
#         function_app_name = LOGIC_APP_NAME  # This is your Function App name hosting the logic

#         credentials = DefaultAzureCredential()
#         client = LogicManagementClient(credentials, subscription_id)

#         try:
#             # Assuming the 'workflow_name' is part of the URL path or managed internally by Logic Apps
#             workflow_name = 'create-pdf-send-letter'  # Specific workflow name if applicable
#             full_resource_path = f"{function_app_name}/{workflow_name}"  # Adjusted for direct workflow access

#             logger.info(f"Attempting to cancel Logic App run: {full_resource_path} with Run ID: {tracker.logic_app_run_id}")
#             cancellation_response = client.workflow_runs.cancel(
#                 resource_group_name=resource_group_name,
#                 workflow_name=full_resource_path,  # Using the full path assuming 'function_app_name' includes Logic App base path
#                 run_name=tracker.logic_app_run_id
#             )
#             logger.debug(f"Response from cancellation: {cancellation_response}")

#             tracker.status = 'Cancelled'
#             tracker.save()
#             return Response({"message": "Logic App run cancelled successfully."}, status=200)
#         except Exception as e:
#             logger.error(f"Failed to cancel Logic App run due to: {e}", exc_info=True)
#             return Response({"message": str(e)}, status=500)




# class CancelScheduledLetterView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request, tracker_id):
#         tracker = get_object_or_404(Tracker, pk=tracker_id, owner=request.user)
#         if not tracker.logic_app_run_id:
#             logger.warning("No Logic App run ID associated with this tracker ID: %s", tracker_id)
#             return Response({"message": "No scheduled task found for this entry."}, status=404)

#         run_id = tracker.logic_app_run_id
#         if not run_id:
#             return Response({"error": "Run ID is required in the request body."}, status=400)

#         # Azure subscription ID
#         subscription_id = LOGIC_SUBSCRIPTION_ID

#         # Resource group name where the Logic App is deployed
#         resource_group_name = LOGIC_RESOURCE_GROUP_NAME

#         # Initialize Azure credentials
#         credentials = DefaultAzureCredential(
#             # client_id=AZURE_CLIENT_ID,
#             # client_secret=AZURE_SECRET_ID,
#             # tenant_id=AZURE_TENANT_ID
#         )
#         # Initialize Resource Management Client
#         resource_client = ResourceManagementClient(credentials, subscription_id)

#         access_token = credentials.get_token('https://management.azure.com/').token


#         try:
#             # Construct the resource ID of the Logic App
#             # logic_app_resource_id = f"/subscriptions/{subscription_id}/resourceGroups/{resource_group_name}/providers/Microsoft.Web/sites/letter-sending-logicapp"

#             # Construct the URL to cancel the Logic App run
#             # cancel_url = f"https://management.azure.com{logic_app_resource_id}/runs/{run_id}/cancel?api-version=2017-07-01"
#             # cancel_url =  f"https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group_name}/providers/Microsoft.Web/sites/{LOGIC_APP_NAME}/runs/{run_id}/cancel?api-version=2016-06-01"
#             cancel_url =  f"https://management.azure.com/subscriptions/{subscription_id}/resourceGroups/{resource_group_name}/providers/Microsoft.Logic/workflows/{LOGIC_APP_NAME}/runs/{run_id}/cancel?api-version=2016-06-01"


#             # Construct headers with Azure authentication
#             headers = {
#                 'Authorization': f'Bearer {access_token}',  # Replace access_token with your Azure access token
#                 'Content-Type': 'application/json'
#             }


#             # Send HTTP POST request to cancel the Logic App run
#             response = requests.post(cancel_url, headers=headers)

#             # Check if the cancellation was successful
#             if response.status_code == 200:
#                 logger.info("Logic App run cancelled successfully.")
#                 return Response({"message": "Logic App run cancelled successfully."}, status=200)
#             else:
#                 logger.error("Failed to cancel Logic App run.")
#                 return Response({"error": "Failed to cancel Logic App run."}, status=500)
#         except Exception as e:
#             logger.error(f"Failed to cancel Logic App run due to: {e}", exc_info=True)
#             return Response({"error": "Failed to cancel Logic App run."}, status=500)