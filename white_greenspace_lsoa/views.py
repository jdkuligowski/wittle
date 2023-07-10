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
# Create your views here.
from .models import ParksLsoa
from .serializers.common import ParksLSOASerializer



class ParksLSOALstView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        parks_lsoa = ParksLsoa.objects.all()  # get all fields using all() method
        serialized_parks = ParksLSOASerializer(parks_lsoa, many=True)
        return Response(serialized_parks.data, status=status.HTTP_200_OK)
