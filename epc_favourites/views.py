from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Favourite
from django.db import IntegrityError
from rest_framework import status



class AddNewFavourite(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_favourites = Favourite.objects.filter(owner=request.user)
        serialized_data = [{"postcode": fav.postcode, "address": fav.address, "category": fav.category} for fav in user_favourites]
        return Response(serialized_data, status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        postcode = request.data.get('postcode')
        address = request.data.get('address')
        category = request.data.get('category')
        
        if not postcode or not address:
            return Response({"error": "Both postcode and address are required"}, status=400)
        
        try:
            favourite = Favourite(postcode=postcode, address=address, category=category, owner=request.user)
            favourite.save()
            return Response({"message": "Favourite added successfully!"}, status=201)
        except IntegrityError:
            return Response({"error": "A favourite with this postcode and address already exists!"}, status=400)
    

    def delete(self, request, *args, **kwargs):
        postcode = request.data.get('postcode')
        address = request.data.get('address')
        
        try:
            favourite = Favourite.objects.get(postcode=postcode, address=address, owner=request.user)
            favourite.delete()
            return Response({"message": "Favourite deleted successfully!"}, status=status.HTTP_200_OK)
        except Favourite.DoesNotExist:
            return Response({"error": "Favourite not found!"}, status=status.HTTP_404_NOT_FOUND)