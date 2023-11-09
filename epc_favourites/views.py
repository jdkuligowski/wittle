from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Favourite
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError




class AddNewFavourite(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_favourites = Favourite.objects.filter(owner=request.user)
        serialized_data = [{"postcode": fav.postcode, "address": fav.address, "category": fav.category} for fav in user_favourites]
        return Response(serialized_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        favourites_data = request.data  # Expecting an array of objects
        response_data = []

        for data in favourites_data:
            # Extract only the relevant fields
            try:
                favourite = Favourite(
                    postcode=data.get('postcode'),
                    address=data.get('address'),
                    category=data.get('category'),
                    market_status=data.get('addedOn'),
                    property_type=data.get('property_type'),
                    price=data.get('price'),
                    bathrooms=data.get('bathrooms'),
                    bedrooms=data.get('bedrooms'),
                    let_available_date=data.get('let_available_date'),
                    date_added_db=data.get('date_added_db'),
                    rightmove_id=data.get('rightmove_id'),
                    url=data.get('url'),
                    current_epc=data.get('current_epc'),
                    potential_epc=data.get('potential_epc'),
                    owner=request.user  # Setting the owner to the requesting user
                )
                favourite.full_clean()  # Validate the model instance
                favourite.save()
                response_data.append({"message": "Favourite added successfully!", "id": favourite.id})
            except IntegrityError:
                response_data.append({"error": "A favourite with this postcode and address already exists!"})
            except ValidationError as e:
                response_data.append({"error": str(e)})

        return Response(response_data, status=status.HTTP_201_CREATED)
    

    def delete(self, request, *args, **kwargs):
        postcode = request.data.get('postcode')
        address = request.data.get('address')
        
        try:
            favourite = Favourite.objects.get(postcode=postcode, address=address, owner=request.user)
            favourite.delete()
            return Response({"message": "Favourite deleted successfully!"}, status=status.HTTP_200_OK)
        except Favourite.DoesNotExist:
            return Response({"error": "Favourite not found!"}, status=status.HTTP_404_NOT_FOUND)
