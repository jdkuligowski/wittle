from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import format_html
from django.conf import settings

def campaign_launch():
    # Construct the email body with form details using template
    email_body = format_html(
        "<p><strong>New Campaign Launched!</strong></p>"
    )

    # Send the notification email to yourself with the details
    send_mail(
        'New campaign launched!',  # subject
        '',  # message body (plain text, not used here)
        'James at Wittle <james@wittle.co>',  # from email, assuming it's set in settings
        ['james@wittle.co'],  # to email
        html_message=email_body,  # HTML message
    )