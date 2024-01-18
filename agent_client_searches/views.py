from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ClientSearches
from agent_client_details.models import ClientDetails
from .serializers.common import ClientSearchSerializer
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError




class GetSearches(APIView):
    def get(self, request, *args, **kwargs):
          user_searches = ClientSearches.objects.filter(client__owner=request.user)
          serializer = ClientSearchSerializer(user_searches, many=True)
          return Response(serializer.data, status=status.HTTP_200_OK)



class AddNewSearch(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        client_id = request.data.get('client_id')
        try:
            client = ClientDetails.objects.get(id=client_id, owner=request.user)
        except ClientDetails.DoesNotExist:
            return Response({"error": "Client details not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClientSearchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(client=client)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteSearch(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, id, *args, **kwargs):
        client_id = request.headers.get('Client-ID')
        try:
            client_details = ClientDetails.objects.get(id=client_id, owner=request.user)
        except ClientDetails.DoesNotExist:
            return Response({"error": "ClientDetails not found!"}, status=status.HTTP_404_NOT_FOUND)

        try:
            favourite = ClientSearches.objects.get(id=id, client=client_details)
            favourite.delete()
            return Response({"message": "ClientSearches deleted successfully!"}, status=status.HTTP_200_OK)
        except ClientSearches.DoesNotExist:
            return Response({"error": "ClientSearches not found!"}, status=status.HTTP_404_NOT_FOUND)



class UpdateSearch(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, id, *args, **kwargs):
            try:
                search = ClientSearches.objects.get(id=id, client__owner=request.user)
            except ClientSearches.DoesNotExist:
                return Response({"error": "ClientSearches not found!"}, status=status.HTTP_404_NOT_FOUND)

            serializer = ClientSearchSerializer(search, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)