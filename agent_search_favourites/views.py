from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import AgentFavourites
from .serializers.common import AgentFavouriteSerializer
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError




class AddNewFavourite(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_favourites = AgentFavourites.objects.filter(owner=request.user)
        serializer = AgentFavouriteSerializer(user_favourites, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



    def post(self, request, *args, **kwargs):
        serializer = AgentFavouriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        


class DeleteFavourites(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, *args, **kwargs):
        rightmove_id = request.data.get('rightmove_id')
        
        try:
            favourite = AgentFavourites.objects.get(rightmove_id=rightmove_id, owner=request.user)
            favourite.delete()
            return Response({"message": "AgentFavourites deleted successfully!"}, status=status.HTTP_200_OK)
        except AgentFavourites.DoesNotExist:
            return Response({"error": "AgentFavourites not found!"}, status=status.HTTP_404_NOT_FOUND)