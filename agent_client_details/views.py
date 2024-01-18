from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ClientDetails
from .serializers.common import ClientDetailsSerializer
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError
from rest_framework.exceptions import NotFound



class GetClient(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, client_id, *args, **kwargs):
        try:
            client_detail = ClientDetails.objects.get(id=client_id, owner=request.user)
        except ClientDetails.DoesNotExist:
            raise NotFound(detail="Client not found", code=404)

        serializer = ClientDetailsSerializer(client_detail)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetMultipleClients(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        client_details = ClientDetails.objects.filter(owner=request.user)
        serializer = ClientDetailsSerializer(client_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddClient(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request, *args, **kwargs):
        serializer = ClientDetailsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        