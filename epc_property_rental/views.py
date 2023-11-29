from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .serializers.common import RentalSerializer
from .models import Property 
from epc.models import Data
from epc.serializers.common import EPCSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
import math
from django.db.models import Q
from django.core.cache import cache
import re



from epc_property_rental.utilities.data_processing_controller import process_daily_rental_data
from epc_property_rental.utilities.data_processing_controller import process_weekly_rental_data


class RentalProperties(APIView):
    def get(self, request, postcode):
        try:
            # Filtering postcodes objects where field contains the substring 'postcode'
            postcodes = Property.objects.filter(postcode__icontains=postcode)

            # for property in postcodes:
            #   print(property.size)  # Or log the specific float fields

            if not postcodes:
                return Response({'message': 'No data found for this postcode.'}, status=status.HTTP_404_NOT_FOUND)
            
            serialized_postcodes = RentalSerializer(postcodes, many=True)
            return Response(serialized_postcodes.data, status=status.HTTP_200_OK)
            
        except ObjectDoesNotExist:
            return Response({'message': 'Postcode not found.'}, status=status.HTTP_404_NOT_FOUND)




class DataReadyWebhook(APIView):
    def post(self, request):
        # Extract the 'resource' object
        resource_object = request.data.get('resource', {})
        # print(request.data)
        # print(request.body)

        # Extract 'defaultDatasetId' from the resource object
        defaultDatasetId = resource_object.get('defaultDatasetId', None)
        
        if defaultDatasetId:
            print('got dataset id ->', defaultDatasetId)

        
        if not defaultDatasetId:
            raise ParseError(detail="Missing 'defaultDatasetId' in resource object")

        try:
            process_daily_rental_data(defaultDatasetId)
            return JsonResponse({"message": "Data extraction process completed successfully!"})
        except Exception as e:
            # Handle any exception that might occur during the extraction process
            return JsonResponse({"error": str(e)}, status=500)




class RentalWeeklyDataWebhook(APIView):
    def post(self, request):
        # Extract the 'resource' object
        resource_object = request.data.get('resource', {})
        # print(request.data)
        # print(request.body)

        # Extract 'defaultDatasetId' from the resource object
        defaultDatasetId = resource_object.get('defaultDatasetId', None)
        
        if defaultDatasetId:
            print('got dataset id ->', defaultDatasetId)

        
        if not defaultDatasetId:
            raise ParseError(detail="Missing 'defaultDatasetId' in resource object")

        try:
            process_weekly_rental_data(defaultDatasetId)
            return JsonResponse({"message": "Data extraction process completed successfully!"})
        except Exception as e:
            # Handle any exception that might occur during the extraction process
            return JsonResponse({"error": str(e)}, status=500)







@api_view(['GET'])
def combined_data(request):
    user_postcode = request.GET.get('postcode')
    bedrooms_min = request.GET.get('min_bedrooms')
    bedrooms_max = request.GET.get('max_bedrooms')
    rental_price_min = request.GET.get('rental_price_min')
    rental_price_max = request.GET.get('rental_price_max')
    rental_additional = request.GET.get('rental_additional')

    if not user_postcode:
        return Response({'error': 'No postcode provided'}, status=400)


    # Convert bedroom and price parameters to integers, handling 'null' string
    try:
        bedrooms_min = int(bedrooms_min) if bedrooms_min and bedrooms_min != 'null' else None
        bedrooms_max = int(bedrooms_max) if bedrooms_max and bedrooms_max != 'null' else None
        rental_price_min = int(rental_price_min) if rental_price_min and rental_price_min != 'null' else None
        rental_price_max = int(rental_price_max) if rental_price_max and rental_price_max != 'null' else None

    except ValueError:
        return Response({'error': 'Invalid input for bedrooms or price'}, status=400)



    # Generate a unique cache key based on the search parameters
    cache_key = f"combined_data_{user_postcode}_{bedrooms_min}_{bedrooms_max}_{rental_price_min}_{rental_price_max}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)
  
    postcodes = [pc.strip() for pc in user_postcode.split(',')]

    # Create a Q object for each postcode and combine them with OR
    postcode_query = Q()
    for pc in postcodes:
        postcode_query |= Q(outcode__iexact=pc)

    rightmove_data = Property.objects.filter(postcode_query)


    # exclude_ids = request.GET.get('exclude_ids')
    # if exclude_ids:
    #     exclude_ids_list = exclude_ids.split(',')
    #     rightmove_data = rightmove_data.exclude(rightmove_id__in=exclude_ids_list)

    # Apply additional filters
    if bedrooms_min:
        rightmove_data = rightmove_data.filter(bedrooms__gte=bedrooms_min)
    if bedrooms_max:
        rightmove_data = rightmove_data.filter(bedrooms__lte=bedrooms_max)
    if rental_price_min:
        rightmove_data = rightmove_data.filter(price_numeric__gte=rental_price_min)
    if rental_price_max:
        rightmove_data = rightmove_data.filter(price_numeric__lte=rental_price_max)
    if rental_additional == 'Furnished':
        rightmove_data = rightmove_data.exclude(furnish_type='Unfurnished')
    elif rental_additional == 'Unfurnished':
        rightmove_data = rightmove_data.exclude(furnish_type='Furnished')



    combined_data = []

    for entry in rightmove_data:
        epc_entries = Data.objects.filter(
            postcode=entry.postcode,
            current_energy_efficiency=entry.current_epc,
            potential_energy_efficiency=entry.potential_epc
        )

        combined_entry = {
            'property_data': RentalSerializer(entry).data,
            'epc_data_list': [EPCSerializer(epc_entry).data for epc_entry in epc_entries]
        }
        combined_data.append(combined_entry)

    cleaned_data = clean_floats(combined_data)

    # Cache the new data
    cache.set(cache_key, cleaned_data, timeout=30000)

    return Response(cleaned_data)




def clean_floats(data):
    if isinstance(data, list):
        return [clean_floats(item) for item in data]
    elif isinstance(data, dict):
        return {key: clean_floats(value) for key, value in data.items()}
    elif isinstance(data, float):
        if math.isinf(data) or math.isnan(data):
            return None
        return data
    return data

