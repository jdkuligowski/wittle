from django.core.mail import send_mail
from django.conf import settings

def send_weekly_upload_confirmation_email(raw_data, new_records, updated_records, ids_to_mark_live, ids_to_mark_off_market):
    # Email content
    subject = "Rental Weekly Data Upload Confirmation"
    message = f"""\
    Hi James,

    The data upload process is completed.

    Raw Data Records: {len(raw_data)}
    New Records Processed: {len(new_records)}
    Records Updated: {len(updated_records)}
    Properties Marked Live: {len(ids_to_mark_live)}
    Properties Marked Off Market: {len(ids_to_mark_off_market)}

    Regards,
    Daily Data Automation
    """

    # Sender and recipient
    sender_email = 'james@wittle.co'  # or your specific sender email
    receiver_email = "james@wittle.co"

    # Send the email
    send_mail(
        subject,
        message,
        sender_email,
        [receiver_email],
        fail_silently=False,
    )


def send_daily_upload_confirmation_email(raw_data, new_records, updated_records):
    # Email content
    subject = "Rental Daily Data Upload Confirmation"
    message = f"""\
    Hi,

    The data upload process is completed.

    Raw Data Records: {len(raw_data)}
    New Records Processed: {len(new_records)}
    Records Updated: {len(updated_records)}

    Regards,
    Daily Data Automation
    """

    # Sender and recipient
    sender_email = 'james@wittle.co'  # or your specific sender email
    receiver_email = "james@wittle.co"

    # Send the email
    send_mail(
        subject,
        message,
        sender_email,
        [receiver_email],
        fail_silently=False,
    )

