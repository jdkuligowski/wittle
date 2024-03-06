from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import format_html
from django.conf import settings

def new_user_inbound(email, first_name, last_name, company_name):
    # Construct the email body with form details using template
    email_body = format_html(
        "<p><strong>New Agent Sign Up!</strong></p>"
        "<p><strong>Email:</strong> {}</p>"
        "<p><strong>Name:</strong> {} {}</p>"
        "<p><strong>Company:</strong> {}</p>",
        email,
        first_name, last_name,
        company_name,
    )

    # Send the notification email to yourself with the details
    send_mail(
        'Wittle Sign up - New Agent Sign Up!',  # subject
        '',  # message body (plain text, not used here)
        'James at Wittle <james@wittle.co>',  # from email, assuming it's set in settings
        ['james@wittle.co'],  # to email
        html_message=email_body,  # HTML message
    )


def new_user_welcome(email, first_name, last_name, company_name):
    email_subject = "Welcome to Wittle!"
    # we don't need to specify a path for the email folder becauyse django picks this up autommatically
    email_body = render_to_string('new_user_email.html', {'name': first_name})

    send_mail(
        subject=email_subject,
        message="",  # Empty because the email is sent as HTML
        from_email='James <james@wittle.co>',  # from email, assuming it's set in settings
        recipient_list=[email],
        html_message=email_body,
    )