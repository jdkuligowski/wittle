from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from .serializers.common import EPCSerializer
from .models import Data  # ensure you import the correct model

class PostcodeSingleView(APIView):
    def get(self, request, postcode):
        try:
            # Filtering postcodes objects where field contains the substring 'postcode'
            postcodes = Data.objects.filter(postcode__icontains=postcode)
            if not postcodes:
                return Response({'message': 'No data found for this postcode.'}, status=status.HTTP_404_NOT_FOUND)
            
            serialized_postcodes = EPCSerializer(postcodes, many=True)
            return Response(serialized_postcodes.data, status=status.HTTP_200_OK)
            
        except ObjectDoesNotExist:
            return Response({'message': 'Postcode not found.'}, status=status.HTTP_404_NOT_FOUND)
