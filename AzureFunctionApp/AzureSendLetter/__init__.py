import requests
from weasyprint import HTML
from io import BytesIO
import environ
from datetime import datetime
import uuid
import json
import azure.functions as func
from azure.storage.blob import BlobServiceClient
import os

STANNP_API_KEY = os.getenv('STANNP_API_KEY')
AZURE_ACCOUNT_NAME = os.getenv('STORAGE_ACCOUNT_NAME')
AZURE_ACCOUNT_KEY = os.getenv('STORAGE_ACCOUNT_KEY')
AZURE_CONTAINER_NAME = os.getenv('STORAGE_ACCOUNT_CONTAINER')


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        req_body = req.get_json()
    except ValueError:
        return func.HttpResponse("Invalid JSON in request body", status_code=400)

    try:
        html_content = req_body['htmlContent']
        campaign_name = req_body['campaignName']
        template_name = req_body['templateName']
        address = req_body['address']
        step = req_body.get('step', 1)
    except KeyError as e:
        return func.HttpResponse(f"Missing key in JSON: {str(e)}", status_code=400)

    try:
        # Generate PDF
        pdf_bytes_io = BytesIO()
        HTML(string=html_content).write_pdf(target=pdf_bytes_io)
        pdf_bytes_io.seek(0)
    except Exception as e:
        return func.HttpResponse(f"Failed to generate PDF: {str(e)}", status_code=500)

    try:
        # Construct PDF file name and upload to Azure Blob Storage
        timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S")
        unique_id = uuid.uuid4()
        file_name = f"{campaign_name}_{template_name}_{step}_{unique_id}_{timestamp}.pdf"
        
        container_name = AZURE_CONTAINER_NAME
        blob_service_client = BlobServiceClient.from_connection_string(
            f"DefaultEndpointsProtocol=https;AccountName={AZURE_ACCOUNT_NAME};AccountKey={AZURE_ACCOUNT_KEY};EndpointSuffix=core.windows.net"
        )
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=file_name)
        blob_client.upload_blob(pdf_bytes_io, overwrite=True)
        pdf_url = f"https://{blob_service_client.account_name}.blob.core.windows.net/{container_name}/{file_name}"
    except Exception as e:
        return func.HttpResponse(f"Failed to upload PDF: {str(e)}", status_code=500)

    try:
        # Send PDF to Letter Provider
        api_key = STANNP_API_KEY
        response = requests.post(
            f"https://dash.stannp.com/api/v1/letters/post?api_key={api_key}",
            files={'pdf': ('letter.pdf', pdf_bytes_io.getvalue(), 'application/pdf')},
            data={'test': '1', 'country': 'GB'}
        )
        if response.status_code != 200:
            raise Exception(f"Letter provider API error: {response.text}")
    except Exception as e:
        return func.HttpResponse(f"Failed to send letter to provider: {str(e)}", status_code=500)

    return func.HttpResponse(json.dumps({
        "pdfUrl": pdf_url,
        "fileName": file_name,
        "status": "Sent"
    }), mimetype="application/json")
