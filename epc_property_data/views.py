from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .serializers.common import EPCPropertySerializer
from epc.serializers.common import EPCSerializer
from .models import Property 
from epc.models import Data
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from django.db.models import Q
from django.core.cache import cache
import math

from epc_property_data.utilities.data_processing_controller import process_daily_sales_data, process_weekly_sales_data


class EPCPropertyPostcode(APIView):
    def get(self, request, postcode):
        try:
            # Filtering postcodes objects where field contains the substring 'postcode'
            postcodes = Property.objects.filter(postcode__icontains=postcode)
            if not postcodes:
                return Response({'message': 'No data found for this postcode.'}, status=status.HTTP_404_NOT_FOUND)
            
            serialized_postcodes = EPCPropertySerializer(postcodes, many=True)
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
            process_daily_sales_data(defaultDatasetId)
            return JsonResponse({"message": "Data extraction process completed successfully!"})
        except Exception as e:
            # Handle any exception that might occur during the extraction process
            return JsonResponse({"error": str(e)}, status=500)



class SalesWeeklyDataWebhook(APIView):
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
            process_weekly_sales_data(defaultDatasetId)
            return JsonResponse({"message": "Data extraction process completed successfully!"})
        except Exception as e:
            # Handle any exception that might occur during the extraction process
            return JsonResponse({"error": str(e)}, status=500)






# class CombinedDataView(APIView):
#     def get(self, request, format=None):
#         # Get the list of postcodes from the query parameters
#         user_postcodes = request.query_params.getlist('postcodes[]')

#         if not user_postcodes:
#             return Response({'error': 'No postcodes provided'}, status=400)

#         # Filter properties that have a postcode matching any of the postcodes in the list
#         rightmove_data = Property.objects.filter(postcode__in=user_postcodes)
#         combined_data = []

#         for entry in rightmove_data:
#             epc_entry = Data.objects.filter(
#                 postcode=entry.postcode,
#                 current_energy_efficiency=entry.current_epc,
#                 potential_energy_efficiency=entry.potential_epc
#             ).first()

#             if epc_entry:
#                 combined_entry = {
#                     'rightmove_data': EPCPropertySerializer(entry).data,
#                     'epc_data': EPCSerializer(epc_entry).data
#                 }
#                 combined_data.append(combined_entry)

#         return Response(combined_data)
    



@api_view(['GET'])
def combined_data(request):
    user_postcode = request.GET.get('postcode')
    user_subcode = request.GET.get('subcode')
    bedrooms_min = request.GET.get('min_bedrooms')
    bedrooms_max = request.GET.get('max_bedrooms')
    sales_price_min = request.GET.get('sales_price_min')
    sales_price_max = request.GET.get('sales_price_max')

    # Convert bedroom and price parameters to integers, handling 'null' string
    try:
        bedrooms_min = int(bedrooms_min) if bedrooms_min and bedrooms_min != 'null' else None
        bedrooms_max = int(bedrooms_max) if bedrooms_max and bedrooms_max != 'null' else None
        sales_price_min = int(sales_price_min) if sales_price_min and sales_price_min != 'null' else None
        sales_price_max = int(sales_price_max) if sales_price_max and sales_price_max != 'null' else None
    except ValueError:
        return Response({'error': 'Invalid input for bedrooms or price'}, status=400)

    # Start building the query based on available filters
    filters = Q()

    # Apply postcode filters if available
    if user_postcode:
        postcodes = [pc.strip() for pc in user_postcode.split(',')]
        postcode_filters = Q()
        for pc in postcodes:
            postcode_filters |= Q(outcode__iexact=pc)
        filters &= postcode_filters  # Combine with existing filters using bitwise AND

    # Apply subcode filters if available
    if user_subcode:
        subcodes = [sc.strip() for sc in user_subcode.split(',')]
        subcode_filters = Q()
        for sc in subcodes:
            subcode_filters |= Q(subcode__iexact=sc)
        filters &= subcode_filters  # Combine with existing filters

    # Apply bedroom filters
    if bedrooms_min is not None:
        filters &= Q(bedrooms__gte=bedrooms_min)
    if bedrooms_max is not None:
        filters &= Q(bedrooms__lte=bedrooms_max)

    # Apply price filters
    if sales_price_min is not None:
        filters &= Q(price_numeric__gte=sales_price_min)
    if sales_price_max is not None:
        filters &= Q(price_numeric__lte=sales_price_max)

    # Generate a unique cache key based on the search parameters
    cache_key = f"sales_combined_data_{user_postcode}_{user_subcode}_{bedrooms_min}_{bedrooms_max}_{sales_price_min}_{sales_price_max}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)

    # Execute the query with all filters
    rightmove_data = Property.objects.filter(filters)

    combined_data = []
    for entry in rightmove_data:
        epc_entries = Data.objects.filter(
            postcode=entry.postcode,
            current_energy_efficiency=entry.current_epc,
            potential_energy_efficiency=entry.potential_epc
        )

        if not epc_entries.exists():
            epc_entries = Data.objects.filter(
                postcode=entry.postcode,
                current_energy_rating=entry.current_letter,
                potential_energy_rating=entry.potential_letter
            )

        combined_entry = {
            'property_data': EPCPropertySerializer(entry).data,
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