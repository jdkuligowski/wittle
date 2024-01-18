from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import AgentSearches
from .serializers.common import AgentSearchesSerializer
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError




class AddNewSearch(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_favourites = AgentSearches.objects.filter(owner=request.user)
        serializer = AgentSearchesSerializer(user_favourites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = AgentSearchesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class DeleteSearch(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, id, *args, **kwargs):
        try:
            favourite = AgentSearches.objects.get(id=id, owner=request.user)
            favourite.delete()
            return Response({"message": "AgentSearches deleted successfully!"}, status=status.HTTP_200_OK)
        except AgentSearches.DoesNotExist:
            return Response({"error": "AgentSearches not found!"}, status=status.HTTP_404_NOT_FOUND)



class UpdateSearch(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, id, *args, **kwargs):
        try:
            search = AgentSearches.objects.get(id=id, owner=request.user)
        except AgentSearches.DoesNotExist:
            return Response({"error": "AgentSearches not found!"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AgentSearchesSerializer(search, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
