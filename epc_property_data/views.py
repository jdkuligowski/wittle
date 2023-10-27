from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .serializers.common import EPCPropertySerializer
from .models import Property  # ensure you import the correct model

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
