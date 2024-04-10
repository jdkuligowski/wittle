
from celery import shared_task
from .pdfHandling import generate_pdf_from_html, send_pdf_to_letter_provider



@shared_task
def send_pdf_task(pdf_content, tracker_id, test_mode='1', country='GB'):
    # Assuming pdf_content is the content of the PDF file
    # You may need to adjust how you handle the PDF content based on your application's needs
    pdf_bytes_io = generate_pdf_from_html(pdf_content)  # Generate the PDF
    response = send_pdf_to_letter_provider(pdf_bytes_io, tracker_id, test_mode, country)
    return response.text