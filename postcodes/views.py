# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
#  NotFound is going to provide us with an exception that sends a 404 response to the end user
from rest_framework.exceptions import NotFound
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ParseError

# Create your views here.
from .models import Postcodes
from .serializers.common import PostcodeSerializer
from .serializers.populated import PopulatedPostcodeSerializer


# Postcode information with nothing else attached
class PostcodesListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        postcodes = Postcodes.objects.all()  # get all fields using all() method
        serialized_postcodes = PostcodeSerializer(postcodes, many=True)
        return Response(serialized_postcodes.data, status=status.HTTP_200_OK)


class PostcodeSingleView(APIView):

    def post(self, request):
        postcode = request.data.get("postcode")
        
        if not postcode:
            return Response({'message': 'Postcode not provided.'}, status=status.HTTP_400_BAD_REQUEST)

        return self.get_postcodes_and_response(postcode)

    def get(self, request):
        postcode = request.query_params.get('postcode')
        
        if not postcode:
            raise ParseError("Postcode not provided.")
        
        return self.get_postcodes_and_response(postcode)

    def get_postcodes_and_response(self, postcode):
        postcodes = Postcodes.objects.filter(postcode=postcode)
        
        if not postcodes:
            return Response({'message': 'No data found for this postcode.'}, status=status.HTTP_404_NOT_FOUND)
        
        serialized_postcodes = PopulatedPostcodeSerializer(postcodes, many=True)
        
        return Response(serialized_postcodes.data, status=status.HTTP_200_OK)

# # Single postcodes with everything attached
# class PostcodeSingleView(APIView):

#     def post(self, request):
#         postcode = request.data.get("postcode")
        
#         if not postcode:
#             return Response({'message': 'Postcode not provided.'}, status=status.HTTP_400_BAD_REQUEST)

#         postcodes = Postcodes.objects.filter(postcode=postcode)
        
#         if not postcodes:
#             return Response({'message': 'No data found for this postcode.'}, status=status.HTTP_404_NOT_FOUND)
        
#         serialized_postcodes = PopulatedPostcodeSerializer(postcodes, many=True)
        
#         return Response(serialized_postcodes.data, status=status.HTTP_200_OK)

# # Single postcodes with everything attached
# class PostcodeSingleView(APIView):
#   def get(self, _request, postcode):
#         try:
#             postcodes = Postcodes.objects.filter(postcode=postcode)
#             if not postcodes:
#                 return Response({'message': 'No data found for this postcode.'}, status=status.HTTP_404_NOT_FOUND)
            
#             serialized_postcodes = PopulatedPostcodeSerializer(postcodes, many=True)
#             return Response(serialized_postcodes.data, status=status.HTTP_200_OK)
            
#         except ObjectDoesNotExist:
#             return Response({'message': 'Postcode not found.'}, status=status.HTTP_404_NOT_FOUND)