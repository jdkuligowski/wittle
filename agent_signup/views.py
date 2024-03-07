from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from django.utils.html import format_html

from .serializers.common import AgentSerializer
from .models import AgentSignup


class AgentListView(APIView):
    # permission_classes = (IsAuthenticated, )

    def post(self, request):
        waitlist_item = AgentSerializer(data=request.data)
        if waitlist_item.is_valid():
            # Save the model instance
            saved_instance = waitlist_item.save()

            # Construct the email body with form details
            email_body = format_html(
                "<p><strong>New Agent Demo Request</strong></p>"
                "<p><strong>Email:</strong> {}</p>"
                "<p><strong>Name:</strong> {}</p>"
                "<p><strong>Company:</strong> {}</p>"
                "<p><strong>Position:</strong> {}</p>"
                "<p><strong>Message:</strong> {}</p>",
                saved_instance.email,
                saved_instance.name,
                saved_instance.company,
                saved_instance.position if saved_instance.position else "N/A",
                saved_instance.message if saved_instance.message else "N/A"
            )

            # Send the notification email to yourself with the details
            send_mail(
                'Wittle Inbound - New Agent Sign Up!',  # subject
                '',  # message body (plain text, not used here)
                'James <james@wittle.co>',  # from email
                ['james@wittle.co'],  # your email address as the recipient
                html_message=email_body,  # HTML message
            )
            return Response(waitlist_item.data, status=status.HTTP_201_CREATED)
        else:
            return Response(waitlist_item.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        
