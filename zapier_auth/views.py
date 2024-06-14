# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from django.conf import settings
import requests
from .models import UserZapierConnection
from django.contrib.auth.models import User

class ConnectZapierAPIView(APIView):
    def get(self, request):
        client_id = settings.ZAPIER_CLIENT_ID
        redirect_uri = settings.ZAPIER_REDIRECT_URI
        zapier_auth_url = f"https://zapier.com/app/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
        return redirect(zapier_auth_url)

class ZapierCallbackAPIView(APIView):
    def get(self, request):
        code = request.GET.get('code')
        client_id = settings.ZAPIER_CLIENT_ID
        client_secret = settings.ZAPIER_CLIENT_SECRET
        redirect_uri = settings.ZAPIER_REDIRECT_URI

        # Exchange code for access token
        token_url = "https://zapier.com/app/oauth/token"
        response = requests.post(token_url, data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': redirect_uri,
            'client_id': client_id,
            'client_secret': client_secret
        })

        if response.status_code != 200:
            return Response({'error': 'Failed to obtain access token from Zapier'}, status=status.HTTP_400_BAD_REQUEST)

        token_data = response.json()
        access_token = token_data.get('access_token')
        refresh_token = token_data.get('refresh_token', '')

        # Save the access token to the database
        user = request.user
        UserZapierConnection.objects.update_or_create(
            user=user,
            defaults={
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        )

        return Response({'status': 'connected'}, status=status.HTTP_200_OK)



class SendDataToZapierAPIView(APIView):
    def post(self, request):
        user = request.user
        data = request.data  # Assuming the data to be sent is in the request body

        try:
            connection = UserZapierConnection.objects.get(user=user)
        except UserZapierConnection.DoesNotExist:
            return Response({'error': 'User not connected to Zapier'}, status=status.HTTP_400_BAD_REQUEST)

        zapier_webhook_url = 'https://hooks.zapier.com/hooks/catch/your_webhook_id/'
        response = requests.post(zapier_webhook_url, json=data, headers={
            'Authorization': f'Bearer {connection.access_token}'
        })

        if response.status_code == 200:
            return Response({'status': 'data sent to Zapier'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Failed to send data to Zapier'}, status=response.status_code)