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
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError


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






class CombinedDataView(APIView):
    def get(self, request, format=None):
        # Get the list of postcodes from the query parameters
        user_postcodes = request.query_params.getlist('postcodes[]')

        if not user_postcodes:
            return Response({'error': 'No postcodes provided'}, status=400)

        # Filter properties that have a postcode matching any of the postcodes in the list
        rightmove_data = Property.objects.filter(postcode__in=user_postcodes)
        combined_data = []

        for entry in rightmove_data:
            epc_entry = Data.objects.filter(
                postcode=entry.postcode,
                current_energy_efficiency=entry.current_epc,
                potential_energy_efficiency=entry.potential_epc
            ).first()

            if epc_entry:
                combined_entry = {
                    'rightmove_data': EPCPropertySerializer(entry).data,
                    'epc_data': EPCSerializer(epc_entry).data
                }
                combined_data.append(combined_entry)

        return Response(combined_data)