from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Favourite
from .serializers.common import FavouriteSerializer
from epc_property_data.models import Property as SalesProperty
from epc_property_rental.models import Property as RentalProperty
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError
from django.db.models import Q, F

from account_details.models import Usage
import environ
import requests

class AddNewFavourite(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user_favourites = Favourite.objects.filter(owner=request.user)
        serialized_data = [{"postcode": fav.postcode, "address": fav.address, "category": fav.category} for fav in user_favourites]
        return Response(serialized_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
            favourites_data = request.data  # Expecting an array of objects

            # Assuming the usage_record has already been fetched
            usage_record, _ = Usage.objects.get_or_create(owner=request.user)
            
            # Determine the limit based on the package
            if usage_record.package == 'Free':
                limit = 20
            elif usage_record.package == 'Boost':
                limit = 250
            else:
                # Effectively no limit for non-Free packages
                limit = float('inf')
            
            # Calculate the current headroom
            current_headroom = limit - usage_record.save_lead_gen_month_total
        
            if len(favourites_data) <= current_headroom:

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
                            'market_status': data.get('status'),
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
                            'company': request.user.company,
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
                                            # Update the usage_record to reflect the new total of added favourites
                usage_record.save_lead_gen_month_total += len(favourites_data)
                usage_record.save_lead_gen_total += len(favourites_data)
                usage_record.save()



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
                        'price_numeric': data.get('price_numeric'),
                        'bathrooms': data.get('bathrooms'),
                        'bedrooms': data.get('bedrooms'),
                        'let_available_date': data.get('let_available_date'),
                        'date_added_db': data.get('date_added_db'),
                        'url': data.get('url'),
                        'current_epc': data.get('current_epc'),
                        'potential_epc': data.get('potential_epc'),
                        'owner': request.user,
                        'company': request.user.company,
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
    


class EditSingleFavourite(APIView):
    permission_classes = (IsAuthenticated, )

    def patch(self, request, rightmove_id, *args, **kwargs):
        # Retrieve the favorite by rightmove_id and owner
        try:
            favourite = Favourite.objects.get(rightmove_id=rightmove_id, company=request.user.company)
        except Favourite.DoesNotExist:
            return Response({"error": "Favourite not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Update fields if they are in the request
        for field, value in request.data.items():
            setattr(favourite, field, value)

        try:
            favourite.full_clean()  # Validate the model instance
            favourite.save()  # Save the changes to the database
            return Response({"message": "Favourite updated successfully!"}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)





class UpdateFavorites(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request, *args, **kwargs):
        favourite_ids = request.data.get('favourite_ids', [])
        if not favourite_ids:
            return Response({'error': 'No favorite IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all favorites with the given IDs that belong to the user
            favourites = Favourite.objects.filter(rightmove_id__in=favourite_ids, company=request.user.company)

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


class AddToFavoritesCampaign(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        property_ids = request.data.get('property_ids', [])
        campaign_name = request.data.get('campaign_name', '')

        if not property_ids:
            return Response({'error': 'No property IDs provided'}, status=status.HTTP_400_BAD_REQUEST)
        if not campaign_name:
            return Response({'error': 'No campaign name provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all properties with the given IDs that belong to the user
            properties = Favourite.objects.filter(rightmove_id__in=property_ids, company=request.user.company)

            # Check if the number of properties fetched matches the number of IDs provided
            if properties.count() != len(property_ids):
                return Response({'error': 'One or more properties not found or not owned by user'}, status=status.HTTP_404_NOT_FOUND)

            # Update the letter_campaign field for each property
            for property in properties:
                property.letter_campaign = campaign_name

            # Perform bulk update
            Favourite.objects.bulk_update(properties, ['letter_campaign'])
            
            return Response({'message': 'Properties added to campaign successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RemovePropertiesFromCampaign(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        property_ids = request.data.get('property_ids', [])
        # campaign_name = request.data.get('campaign_name', '')

        if not property_ids:
            return Response({'error': 'No property IDs provided'}, status=status.HTTP_400_BAD_REQUEST)
        # if not campaign_name:
        #     return Response({'error': 'No campaign name provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all properties with the given IDs that belong to the user
            properties = Favourite.objects.filter(rightmove_id__in=property_ids, company=request.user.company)

            # Check if the number of properties fetched matches the number of IDs provided
            if properties.count() != len(property_ids):
                return Response({'error': 'One or more properties not found or not owned by user'}, status=status.HTTP_404_NOT_FOUND)

            # Update the letter_campaign field for each property
            for property in properties:
                property.letter_campaign = 'None'

            # Perform bulk update
            Favourite.objects.bulk_update(properties, ['letter_campaign'])
            
            return Response({'message': 'Properties added to campaign successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ArchivedToSaved(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request, *args, **kwargs):
        favourite_ids = request.data.get('favourite_ids', [])
        if not favourite_ids:
            return Response({'error': 'No favorite IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all favorites with the given IDs that belong to the user
            favourites = Favourite.objects.filter(rightmove_id__in=favourite_ids, company=request.user.company)

            print('count ->', favourites.count())
            print('len ->', len(favourite_ids))
            # Check if the number of favorites fetched matches the number of IDs provided
            if favourites.count() != len(favourite_ids):
                return Response({'error': 'One or more favorites not found or not owned by user'}, status=status.HTTP_404_NOT_FOUND)

            # Update the action field for each favorite
            for favourite in favourites:
                favourite.action = 'Saved'

            # Perform bulk update
            Favourite.objects.bulk_update(favourites, ['action'])
            
            return Response({'message': 'Favorites updated successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class MoveToLetters(APIView): 
    permission_classes = (IsAuthenticated, )

    def put(self, request, *args, **kwargs):
        favourite_ids = request.data.get('favourite_ids', [])
        if not favourite_ids:
            return Response({'error': 'No favorite IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve all favorites with the given IDs that belong to the user
            favourites = Favourite.objects.filter(rightmove_id__in=favourite_ids, company=request.user.company)

            print('count ->', favourites.count())
            print('len ->', len(favourite_ids))
            # Check if the number of favorites fetched matches the number of IDs provided
            if favourites.count() != len(favourite_ids):
                return Response({'error': 'One or more favorites not found or not owned by user'}, status=status.HTTP_404_NOT_FOUND)

            # Update the action field for each favorite
            for favourite in favourites:
                favourite.letter_sequence = 1

            # Perform bulk update
            Favourite.objects.bulk_update(favourites, ['letter_sequence'])
            
            return Response({'message': 'Favorites updated successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteFavourites(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, *args, **kwargs):
        rightmove_id = request.data.get('rightmove_id')
        
        try:
            favourite = Favourite.objects.get(rightmove_id=rightmove_id, company=request.user.company)
            favourite.delete()
            return Response({"message": "Favourite deleted successfully!"}, status=status.HTTP_200_OK)
        except Favourite.DoesNotExist:
            return Response({"error": "Favourite not found!"}, status=status.HTTP_404_NOT_FOUND)
        


class DeleteMultipleFavourites(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, *args, **kwargs):
        rightmove_ids = request.data.get('rightmove_ids')  # Expecting a list of IDs

        if not rightmove_ids:
            return Response({"error": "No rightmove_ids provided!"}, status=status.HTTP_400_BAD_REQUEST)

        # Build a query to match any of the provided rightmove_ids
        query = Q(company=request.user.company) & Q(rightmove_id__in=rightmove_ids)
        
        # Retrieve the matching favourites
        favourites = Favourite.objects.filter(query)
        
        # If no matching favourites are found
        if not favourites.exists():
            return Response({"error": "Favourites not found!"}, status=status.HTTP_404_NOT_FOUND)
        
        # Delete the retrieved favourites
        count, _ = favourites.delete()
        return Response({"message": f"{count} Favourite(s) deleted successfully!"}, status=status.HTTP_200_OK)




class TestSendLetter(APIView):
    def post(self, request, *args, **kwargs):

        env = environ.Env()
        api_key=env('STANNP_API_KEY')

        api_url = 'https://dash.stannp.com/api/v1/letters/create?api_key='

        full_url = api_url + api_key 

        payload = {
            'template': '408789',
            'test': '1',
            # 'recipient[title]': 'Mr',
            'recipient[firstname]': 'The Owner',
            # 'recipient[lastname]': ,
            'recipient[address1]': request.data.get('address1', ''),
            'recipient[address2]': request.data.get('address2', ''),
            'recipient[address3]': request.data.get('address3', ''),
            'recipient[town]': request.data.get('town', ''),
            'recipient[postcode]': request.data.get('postcode', ''),
            'recipient[country]': 'GB',
            'tags': 'used.for.reporting',
            # 'addons': 'first_class'
            'recipient[agent_firstname]': request.data.get('send_first', ''),
            'recipient[agent_lastname]': request.data.get('send_second', ''),
            'recipient[agent_company]': request.data.get('company', ''),
            'recipient[agent_contact]': '012102020303',
            'recipient[agent_role]': 'Boss',
            # 'recipient[company_logo]': 'https://res.cloudinary.com/ddqsv9w3r/image/upload/v1707392195/Wittle-logo_f8eurc.png',

        }

        response = requests.post(full_url, data=payload)
        
        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            # Log or handle error responses from Stannp
            return Response(response.json(), status=response.status_code)





# class UpdateFavoritePropertiesStatus(APIView):
#     permission_classes = (IsAuthenticated, )

#     def post(self, request, *args, **kwargs):
#         property_ids = request.data.get('propertyIds', [])
#         user_favourites = Favourite.objects.filter(owner=request.user, rightmove_id__in=property_ids)
#         updated_properties = []

#         for favorite in user_favourites:
#             current_status = None

#             # Determine whether to check RentalProperty or SalesProperty based on the favorite's property_type
#             if favorite.channel == 'rent':
#                 property_qs = RentalProperty.objects.filter(rightmove_id=favorite.rightmove_id)
#             elif favorite.channel == 'sale':
#                 property_qs = SalesProperty.objects.filter(rightmove_id=favorite.rightmove_id)
#             else:
#                 # Handle unknown property_type, if necessary
#                 continue

#             if property_qs.exists():
#                 current_status = property_qs.first().status
            
#             # If the current status was found and it's different from the favorite's market_status, update it
#             if current_status and favorite.market_status != current_status:
#                 favorite.market_status = current_status
#                 favorite.save()
#                 updated_properties.append(favorite.rightmove_id)

#         # After updates, serialize the updated favorites
#         updated_favorites = Favourite.objects.filter(owner=request.user)  # Fetch all favorites for the user
#         serializer = FavouriteSerializer(updated_favorites, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK) 