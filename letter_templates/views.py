from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.http import HttpResponse
import tempfile
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import base64
from io import BytesIO
from django.http import Http404
import environ
import requests
import logging

from .models import Templates
from .serializers.common import TemplateSerializer


class TemplateList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch templates belonging to the authenticated user
        user_templates = Templates.objects.filter(owner=request.user)
        serializer = TemplateSerializer(user_templates, many=True)
        return Response(serializer.data)


class TemplateAdd(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logging.info(f'Request data: {request.data}')

        user = request.user
        latest_template = Templates.objects.filter(owner=user).order_by('-template_number').first()
        next_template_number = 1 if latest_template is None else latest_template.template_number + 1
        
        request_data = request.data.copy()
        request_data['template_number'] = next_template_number
        request_data['owner'] = user.pk  # Assuming the serializer requires the user ID
        
        serializer = TemplateSerializer(data=request_data)
        if serializer.is_valid():
              validated_data = serializer.validated_data
              
              # Extract recipient data for Azure Logic App
              recipient_data = request_data.get('recipient')
              html_content = request_data.get('htmlContent')
              
              # Call Azure Logic App with HTML content, template name, and recipient data
              pdf_url = self.create_pdf_for_template(html_content, request_data['template_name'], recipient_data)
              logging.info(f'PDF response: {pdf_url}')

              if pdf_url:
                
                validated_data['example_pdf'] = pdf_url
                
                # Use the serializer to save the new template with the updated data
                new_template = serializer.save(example_pdf=pdf_url)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
              else:
                return Response({"error": "Failed to create PDF for the template."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_pdf_for_template(self, html_content, template_name, recipient_data):
        try:
            logic_app_url = 'https://letter-sending-logicapp.azurewebsites.net:443/api/pdf-test-view/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=o9qqHSa7662gJ0faEe6GTH7n8LYid4OjTBqiEz9z5k8'
            data = {
                "htmlContent": html_content,
                "templateName": template_name,
                "address": recipient_data,  # Adjust based on your data structure
            }
            
            print('structured data to send to Logic App ->', data)

            headers = {'Content-Type': 'application/json'}
            response = requests.post(logic_app_url, json=data, headers=headers)
            response.raise_for_status()
            
            azure_response_data = response.json()
            return azure_response_data.get('pdf')
        except requests.HTTPError as http_err:
            logging.error(f'HTTP error while calling Azure Logic App: {http_err}')
        except Exception as err:
            logging.error(f'Error while calling Azure Logic App: {err}')
        return None

class TemplateEdit(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, template_id):
        # Updating an existing template
        template = get_object_or_404(Templates, id=template_id, owner=request.user)
        serializer = TemplateSerializer(template, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TemplateDelete(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, template_id):
        try:
            # Attempt to find the template by its ID and owner
            template = Templates.objects.get(id=template_id, owner=request.user)
        except Templates.DoesNotExist:
            # If the template does not exist, return a 404 Not Found response
            raise Http404

        # If the template is found, delete it
        template.delete()
        
        # Return a 204 No Content response to indicate successful deletion
        return Response(status=status.HTTP_204_NO_CONTENT)




class GeneratePDFView(APIView):
    def post(self, request, *args, **kwargs):
        html_content = request.data.get('htmlContent')
        
        if not html_content:
            return Response({'error': 'Missing htmlContent in request.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate PDF from HTML
        html = HTML(string=html_content)
        pdf_bytes_io = BytesIO()
        html.write_pdf(target=pdf_bytes_io)
        pdf_bytes_io.seek(0)  # Go to the beginning of the StringIO buffer

        # Encode PDF to base64
        pdf_base64 = base64.b64encode(pdf_bytes_io.getvalue()).decode('utf-8')

        # Close the BytesIO stream
        pdf_bytes_io.close()

        # Return the base64-encoded PDF
        return Response({'pdfBase64': pdf_base64}, status=status.HTTP_200_OK)


class TestPostLetterAPI(APIView):
    def post(self, request, *args, **kwargs):
        html_content = request.data.get('htmlContent')
        
        if not html_content:
            return Response({'error': 'Missing htmlContent in request.'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate PDF from HTML
        html = HTML(string=html_content)
        pdf_bytes_io = BytesIO()
        html.write_pdf(target=pdf_bytes_io)

        # Instead of encoding PDF to base64, send it directly to the letter maker's API
        pdf_bytes_io.seek(0)  # Go back to the beginning of the BytesIO stream
        
        # Post the PDF to the letter maker's endpoint
        files = {'pdf': ('letter.pdf', pdf_bytes_io, 'application/pdf')}
        data = {
            'test': '1',
            'country': 'GB',
            
            # You might not need to include 'pdf' in 'data' since it's included in 'files'
        }

        env = environ.Env()
        api_key=env('STANNP_API_KEY')

        api_url = 'https://dash.stannp.com/api/v1/letters/post?api_key='

        full_url = api_url + api_key 

        response = requests.post(full_url, files=files, data=data)
        
        # Close the BytesIO stream
        pdf_bytes_io.close()

        # Handle response from the letter maker's API
        if response.status_code == 200:
            # Assuming the letter maker's API returns a URL to the PDF or some other meaningful data
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            # Handle error response from the letter maker's API
            return Response({'error': 'Failed to post PDF to letter maker.', 'details': response.text}, status=response.status_code)





class ProcessTenplatePDF(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print('starting process->', request.data)
        item = request.data.get('sequence_details')  # This now includes htmlContent for each item



        response = self.call_logic_app(item)
        if response.status_code == 200:
            azure_response_data = response.json()
            print('azure response ->',azure_response_data)

            pdf_url = azure_response_data['pdf']




    def call_logic_app(self, item):
        try:
            print('calling azure logic app')
            logic_app_url = 'https://letter-sending-logicapp.azurewebsites.net:443/api/create-pdf-send-letter/triggers/When_a_HTTP_request_is_received/invoke?api-version=2022-05-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=OHRqUeWC22nD35cmpEy5WBJchc5Z2bdCyP8hp8JNdNk'  # Replace with your Logic App HTTP trigger URL

            data = {
                "htmlContent": item['htmlContent'],
                "templateName": item['template_name'],
                "address": item['recipient'],
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

