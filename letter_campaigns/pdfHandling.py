import requests
from weasyprint import HTML
from io import BytesIO
from django.conf import settings
from campaign_tracking.models import Tracker
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
import environ
from datetime import datetime
import uuid
import json
# import azure.functions as func
from azure.storage.blob import BlobServiceClient

env = environ.Env()
api_key=env('STANNP_API_KEY')

# Environment variables for Azure storage access
AZURE_ACCOUNT_NAME = env('STORAGE_ACCOUNT_NAME')
AZURE_ACCOUNT_KEY = env('STORAGE_ACCOUNT_KEY')
AZURE_CONTAINER_NAME = env('STORAGE_ACCOUNT_CONTAINER')

# AzureWebJobsStorage = env('AZURE_WEB_JOBS_STORAGE')
# AZURE_FUNCTION_CONTAINER_NAME = env('AZURE_FUNCTION_CONTAINER_NAME')



def generate_pdf_from_html(html_content):
    print('generating pdf')
    pdf_bytes_io = BytesIO()
    HTML(string=html_content).write_pdf(target=pdf_bytes_io)
    pdf_bytes_io.seek(0)  # Reset stream position
    return pdf_bytes_io



def upload_pdf_to_azure(pdf_bytes_io, file_name):
    print('uploading pdf to azure')
    # Create a blob service client
    blob_service_client = BlobServiceClient.from_connection_string(
        f"DefaultEndpointsProtocol=https;AccountName={AZURE_ACCOUNT_NAME};AccountKey={AZURE_ACCOUNT_KEY};EndpointSuffix=core.windows.net"
    )

    # Get a reference to a container
    container_client = blob_service_client.get_container_client(AZURE_CONTAINER_NAME)

    # Get a blob client using the file_name
    blob_client = container_client.get_blob_client(blob=file_name)

    # Upload the PDF
    blob_client.upload_blob(pdf_bytes_io, blob_type="BlockBlob")

    # Construct the URL for the uploaded PDF
    pdf_url = f"https://{AZURE_ACCOUNT_NAME}.blob.core.windows.net/{AZURE_CONTAINER_NAME}/{file_name}"

    return pdf_url




def save_pdf_and_update_tracker(html_content, campaign, template_name, address, step, user):
    print('saving pdf and updating tracker')

    # Correct template_name usage
    unique_id = uuid.uuid4()  # Generates a unique UUID
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")  # Current timestamp
    file_name = f"{campaign.campaign_name}_{template_name}_{address['address']}_{step}_{unique_id}_{timestamp}.pdf"
    print('established file name')


    try:
        print('in generate pdf try block')
        pdf_bytes_io = generate_pdf_from_html(html_content)
        pdf_url = upload_pdf_to_azure(pdf_bytes_io, file_name)

        tracker = Tracker.objects.create(
            campaign_name=campaign.campaign_name,
            campaign_step=step,
            template_name=template_name,
            target_address=address['address'],
            target_name=address['owner_name'],
            launch_price=address['price'],
            date_added=address['added_revised'],
            pdf=pdf_url,
            status="Generated",
            owner=user
        )

        return pdf_bytes_io, tracker.id

    except Exception as e:
        print(f"Error in save_pdf_and_update_tracker: {str(e)}")
        return None, None



def send_pdf_to_letter_provider(pdf_bytes_io, tracker_id, test_mode='1', country='GB'):
    print('sending pdf to provider')
    files = {'pdf': ('letter.pdf', pdf_bytes_io, 'application/pdf')}
    data = {
        'test': test_mode,
        'country': country,
    }

    api_key=env('STANNP_API_KEY')
    api_url = 'https://dash.stannp.com/api/v1/letters/post?api_key='

    full_url = api_url + api_key 

    response = requests.post(full_url, files=files, data=data)

    pdf_bytes_io.close()  # Close the stream

    # Assuming successful API call
    tracker = Tracker.objects.get(id=tracker_id)
    tracker.status = "Sent"
    tracker.save()

    return response



