from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .serializers.common import EPCPropertySerializer
from .models import Property  # ensure you import the correct model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError


# from epc_property_data.utilities.data_extraction import extract_data_from_api


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
        
        # Extract 'defaultDatasetId' from the resource object
        defaultDatasetId = resource_object.get('defaultDatasetId', None)
        
        if not defaultDatasetId:
            raise ParseError(detail="Missing 'defaultDatasetId' in resource object")

        try:
            extract_data_from_api(defaultDatasetId)
            return JsonResponse({"message": "Data extraction process completed successfully!"})
        except Exception as e:
            # Handle any exception that might occur during the extraction process
            return JsonResponse({"error": str(e)}, status=500)
