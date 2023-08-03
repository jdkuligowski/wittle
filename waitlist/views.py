from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


from .serializers.common import WaitlistSerializer
from .models import Waitlist




class WaitlistView(APIView):
    def post(self, request):
        waitlist_item = WaitlistSerializer(data=request.data)
        if waitlist_item.is_valid():
            waitlist_item.save()

            # get the email address from the saved item
            email = waitlist_item.validated_data.get('email')
            
            # Generate the email content from your template
            html_message = render_to_string('waitlist_email.html', {
                'linkedin_link': 'https://www.linkedin.com/company/91745581',
                'unsubscribe_link': 'https://www.wittle.co/unsubscribe'
            })
            plain_message = strip_tags(html_message)

            # Send the email
            send_mail(
                'Thanks for joining the Wittle waitlist!',  # subject
                plain_message,  # message
                'james@wittle.co',  # from email
                [email],  # recipient list
                html_message=html_message,
            )

            return Response(waitlist_item.data, status=status.HTTP_201_CREATED)
        else:
            return Response(waitlist_item.errors, status=status.HTTP_400_BAD_REQUEST)




class CheckEmailView(APIView):
    def post(self, request):
        email = request.data.get('email')  # retrieve email from request data
        if email is None:
            return Response({"detail": "No email provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            waitlist_item = Waitlist.objects.get(email=email)
            return Response({"detail": "Email exists"}, status=status.HTTP_200_OK)
        except Waitlist.DoesNotExist:
            return Response({"detail": "Email does not exist"}, status=status.HTTP_404_NOT_FOUND)




class UnsubscribeView(APIView):
    def post(self, request):
        email = request.data.get('email')  # retrieve email from request data
        if email is None:
            return Response({"detail": "No email provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            waitlist_item = Waitlist.objects.get(email=email)
            # Toggle off the email preferences
            waitlist_item.preferences = False
            waitlist_item.save()
            return Response({"detail": "Email unsubscribed"}, status=status.HTTP_200_OK)
        except Waitlist.DoesNotExist:
            return Response({"detail": "Email does not exist"}, status=status.HTTP_404_NOT_FOUND)
