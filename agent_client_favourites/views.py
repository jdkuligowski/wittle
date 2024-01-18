from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ClientFavourites
from .serializers.common import ClientFavouritesSerializer
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError
from agent_client_details.models import ClientDetails




class GetFavourites(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_favourites = ClientFavourites.objects.filter(client=request.user)
        serializer = ClientFavouritesSerializer(user_favourites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddNewFavourite(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        client_id = request.data.get('client_id')
        try:
            client_details = ClientDetails.objects.get(id=client_id, owner=request.user)
        except ClientDetails.DoesNotExist:
            return Response({"error": "Client details not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClientFavouritesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(client=client_details)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteFavourites(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, *args, **kwargs):
        rightmove_id = request.data.get('rightmove_id')
        client_id = request.data.get('client_id')  # Include client_id in the request

        try:
            client_details = ClientDetails.objects.get(id=client_id, owner=request.user)
            favourite = ClientFavourites.objects.get(rightmove_id=rightmove_id, client=client_details)
            favourite.delete()
            return Response({"message": "ClientFavourites deleted successfully!"}, status=status.HTTP_200_OK)
        except (ClientDetails.DoesNotExist, ClientFavourites.DoesNotExist):
            return Response({"error": "ClientFavourites not found!"}, status=status.HTTP_404_NOT_FOUND)
