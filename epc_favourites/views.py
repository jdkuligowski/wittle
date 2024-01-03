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
            print("Received data:", favourites_data)


            for data in favourites_data:
                rightmove_id = data.get('rightmove_id')

                if rightmove_id is None:
                    response_data.append({"error": "rightmove_id is required"})
                    continue

                # Check if a favourite with this rightmove_id already exists
                favourite, created = Favourite.objects.get_or_create(
                    rightmove_id=rightmove_id,
                    owner=request.user,
                    defaults={
                        'postcode': data.get('postcode'),
                        'address': data.get('address'),
                        'category': data.get('date_added_db'),
                        'agent': data.get('agent'),
                        'channel': data.get('type'),
                        'market_status': data.get('addedOn'),
                        'property_type': data.get('propertyType'),
                        'price': data.get('price'),
                        'bathrooms': data.get('bathrooms'),
                        'bedrooms': data.get('bedrooms'),
                        'let_available_date': data.get('let_available_date'),
                        'date_added_db': data.get('date_added_db'),
                        'url': data.get('url'),
                        'current_epc': data.get('current_epc'),
                        'potential_epc': data.get('potential_epc'),
                        'owner': request.user,
                        'action': 'Saved',
                        'added_revised': data.get('added_revised'),
                        'reduced_revised': data.get('reduced_revised'),
                    }
                )

                if created:
                    try:
                        favourite.full_clean()  # Validate the model instance
                        favourite.save()
                        response_data.append({"message": "Favourite added successfully!", "id": favourite.id})
                    except ValidationError as e:
                        response_data.append({"error": str(e)})
                else:
                    response_data.append({"message": "Favourite already exists", "id": favourite.id})

            return Response(response_data, status=status.HTTP_201_CREATED)
    



class RemoveProperty(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_favourites = Favourite.objects.filter(owner=request.user)
        serialized_data = [{"postcode": fav.postcode, "address": fav.address, "category": fav.category} for fav in user_favourites]
        return Response(serialized_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
            favourites_data = request.data  # Expecting an array of objects
            response_data = []
            print("Received data:", favourites_data)


            for data in favourites_data:
                rightmove_id = data.get('rightmove_id')

                if rightmove_id is None:
                    response_data.append({"error": "rightmove_id is required"})
                    continue

                # Check if a favourite with this rightmove_id already exists
                favourite, created = Favourite.objects.get_or_create(
                    rightmove_id=rightmove_id,
                    owner=request.user,
                    defaults={
                        'postcode': data.get('postcode'),
                        'address': data.get('address'),
                        'category': data.get('date_added_db'),
                        'agent': data.get('agent'),
                        'channel': data.get('type'),
                        'market_status': data.get('addedOn'),
                        'property_type': data.get('propertyType'),
                        'price': data.get('price'),
                        'bathrooms': data.get('bathrooms'),
                        'bedrooms': data.get('bedrooms'),
                        'let_available_date': data.get('let_available_date'),
                        'date_added_db': data.get('date_added_db'),
                        'url': data.get('url'),
                        'current_epc': data.get('current_epc'),
                        'potential_epc': data.get('potential_epc'),
                        'owner': request.user,
                        'action': 'Removed',
                        'added_revised': data.get('added_revised'),
                        'reduced_revised': data.get('reduced_revised'),
                    }
                )

                if created:
                    try:
                        favourite.full_clean() 
                        favourite.save()
                        response_data.append({"message": "Property excluded successfully!", "id": favourite.id})
                    except ValidationError as e:
                        response_data.append({"error": str(e)})
                else:
                    response_data.append({"message": "Property already exists", "id": favourite.id})

            return Response(response_data, status=status.HTTP_201_CREATED)
    






class UpdateFavorites(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request, *args, **kwargs):
        favourite_ids = request.data.get('favourite_ids', [])
        if not favourite_ids:
            return Response({'error': 'No favorite IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all favorites with the given IDs that belong to the user
            favourites = Favourite.objects.filter(rightmove_id__in=favourite_ids, owner=request.user)

            print('count ->', favourites.count())
            print('len ->', len(favourite_ids))
            # Check if the number of favorites fetched matches the number of IDs provided
            if favourites.count() != len(favourite_ids):
                return Response({'error': 'One or more favorites not found or not owned by user'}, status=status.HTTP_404_NOT_FOUND)

            # Update the action field for each favorite
            for favourite in favourites:
                favourite.action = 'Extracted'

            # Perform bulk update
            Favourite.objects.bulk_update(favourites, ['action'])
            
            return Response({'message': 'Favorites updated successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class DeleteFavourites(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, *args, **kwargs):
        rightmove_id = request.data.get('rightmove_id')
        
        try:
            favourite = Favourite.objects.get(rightmove_id=rightmove_id, owner=request.user)
            favourite.delete()
            return Response({"message": "Favourite deleted successfully!"}, status=status.HTTP_200_OK)
        except Favourite.DoesNotExist:
            return Response({"error": "Favourite not found!"}, status=status.HTTP_404_NOT_FOUND)