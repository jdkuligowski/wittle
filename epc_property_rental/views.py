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




from epc_property_rental.utilities.data_extraction import extract_data_from_api


class RentalProperties(APIView):
    def get(self, request, postcode):
        try:
            # Filtering postcodes objects where field contains the substring 'postcode'
            postcodes = Property.objects.filter(postcode__icontains=postcode)
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
            extract_data_from_api(defaultDatasetId)
            return JsonResponse({"message": "Data extraction process completed successfully!"})
        except Exception as e:
            # Handle any exception that might occur during the extraction process
            return JsonResponse({"error": str(e)}, status=500)





# class CombinedDataView(APIView):
#     def get(self, request, format=None):
#         user_postcode = request.query_params.get('postcode')

#         if not user_postcode:
#             return Response({'error': 'No postcode provided'}, status=400)

#         rightmove_data = Property.objects.filter(postcode__icontains=user_postcode)
#         combined_data = []

#         for entry in rightmove_data:
#             epc_entries = Data.objects.filter(
#                 postcode=entry.postcode,
#                 current_energy_efficiency=entry.current_epc,
#                 potential_energy_efficiency=entry.potential_epc
#             )

#             # epc_data_list = [EPCSerializer(epc_entry).data for epc_entry in epc_entries]
#             epc_data_list = []
#             for epc_entry in epc_entries:
#                 epc_data = self.clean_floats(EPCSerializer(epc_entry).data)
#                 epc_data_list.append(epc_data)

#             if epc_data_list:
#                 combined_entry = {
#                     'rightmove_data': RentalSerializer(entry).data,
#                     'epc_data_list': epc_data_list
#                 }
#                 combined_data.append(combined_entry)

#         return Response(combined_data)

#     def clean_floats(self, data_dict):
#         """ Replace out-of-range float values with None """
#         for key, value in data_dict.items():
#             if isinstance(value, float) and (math.isinf(value) or math.isnan(value)):
#                 data_dict[key] = None
#         return data_dict
    


# @api_view(['GET'])
# def combined_data(request):
#     # Retrieve query parameters, e.g., a postcode
#     user_postcode = request.GET.get('postcode')

#     # Check if the postcode parameter is provided
#     if not user_postcode:
#         return JsonResponse({'error': 'No postcode provided'}, status=400)

#     # Query the RightMoveEPCs model
#     rightmove_data = Property.objects.filter(postcode__icontains=user_postcode)




#     # For each entry in rightmove_data, find the corresponding entry in EPCData
#     combined_data = []
#     for entry in rightmove_data:
#         epc_entry = Data.objects.filter(
#             postcode=entry.postcode,
#             current_energy_efficiency=entry.current_epc,
#             potential_energy_efficiency=entry.potential_epc
#         ).first()

#         if epc_entry:
#             combined_entry = {
#                 'postcode': entry.postcode,
#                 'rightmove_current_epc': entry.current_epc,
#                 'rightmove_potential_epc': entry.potential_epc,
#                 'epc_current_energy_efficiency': epc_entry.current_energy_efficiency,
#                 'epc_potential_energy_efficiency': epc_entry.potential_energy_efficiency
#                 # Add additional fields as needed
#             }
#             combined_data.append(combined_entry)

#     return JsonResponse(combined_data, safe=False)

@api_view(['GET'])
def combined_data(request):
    user_postcode = request.GET.get('postcode')

    if not user_postcode:
        return Response({'error': 'No postcode provided'}, status=400)
  
    # Generate a unique cache key based on the search parameters
    cache_key = f"combined_data_{user_postcode}"
    cached_data = cache.get(cache_key)

    if cached_data:
        return Response(cached_data)
  
    postcodes = [pc.strip() for pc in user_postcode.split(',')]

    # Create a Q object for each postcode and combine them with OR
    postcode_query = Q()
    for pc in postcodes:
        postcode_query |= Q(postcode__icontains=pc)

    rightmove_data = Property.objects.filter(postcode_query)
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