# rest_framework imports
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
#  NotFound is going to provide us with an exception that sends a 404 response to the end user
from rest_framework.exceptions import NotFound

from django.db.models import Q
from itertools import chain
from django.db.models import Prefetch
import time

# custom imports
from property_bars.models import PropertyBar
from property_cafes.models import PropertyCafe
from property_restaurants.models import PropertyRestaurant
from property_primaries.models import PropertyPrimary
from property_secondaries.models import PropertySecondary
from property_colleges.models import PropertyCollege
from property_takeaways.models import PropertyTakeaways
from property_gyms.models import PropertyGym
from property_supermarkets.models import PropertySupermarket
from property_tubes.models import PropertyTube
from property_parks.models import PropertyPark
from percentiles.models import PropertyPercentiles
# from .models import PropertyTube

from .models import Property  #  model will be used to query the db
from .serializers.common import PropertySerializer
from.serializers.simple_populated import BasicPopulatedPropertySerializer
# imports the populated serializer that includes the reviews field
from .serializers.populated import PopulatedPropertySerializer
from property_bars.serializers.common import PropertyBarSerializer
from property_gyms.serializers.common import PropertyGymSerializer
from property_restaurants.serializers.common import PropertyRestaurantSerializer


# import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class PropertyListView(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly, ) # one-tuple requires trailing comma

    # ENDPOINTS & METHODS:
    # GET /properties/
    # POST /properties/

    # GET - Returns all properties
    def get(self, _request):
        # in this controller, we just want to get all the items inside the albums table and return it as a response
        # properties = Property.objects.all() 
        properties = Property.objects.prefetch_related(
          Prefetch('percentiles', queryset=PropertyPercentiles.objects.all())
        )  # get all fields using all() method
        # .all() returns a QuerySet, we need to use the serializer to convert this into a python datatype
        # if we expect multiple items in the QuerySet, use many=True
        serialized_properties = BasicPopulatedPropertySerializer(properties, many=True)
        # print('serialized data ->', serialized_properties.data)
        print('getting properties')
        #  Response sends data and status back to the user as a response
        return Response(serialized_properties.data, status=status.HTTP_200_OK)


# ENDPOINT: /properties/:pk/
class PropertyDetailView(APIView):

    # CUSTOM FUNCTION
    # Purpose of this function is to attempt the find a specific property returning that property, and throwing a 404 if failed
    def get(self, _request, pk):

            # properties = Property.objects.filter(pk=pk)
            properties = Property.objects.filter(pk=pk).prefetch_related(
              Prefetch('bars', queryset=PropertyBar.objects.filter(walking_time_mins__lte=15)),
              Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(walking_time_mins__lte=15)),
              Prefetch('primaries', queryset=PropertyPrimary.objects.filter(walking_time_mins__lte=15)),
              Prefetch('secondaries', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=15)),
              Prefetch('colleges', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=15)),
              Prefetch('gyms', queryset=PropertyGym.objects.filter(walking_time_mins__lte=15)),
              Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(walking_time_mins__lte=15)),
              Prefetch('tubes', queryset=PropertyTube.objects.filter(walking_time_mins__lte=15)),
              Prefetch('parks', queryset=PropertyPark.objects.filter(walking_time_mins__lte=15)),
              Prefetch('cafes', queryset=PropertyCafe.objects.filter(walking_time_mins__lte=15)),
              Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(walking_time_mins__lte=15)),
            )
            serialized_properties = PopulatedPropertySerializer(
                properties, many=True)

            print('getting single normal property')
            #  Response sends data and status back to the user as a response
            return Response(serialized_properties.data, status=status.HTTP_200_OK)
        
  


class PropertyWittleView(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly, ) # one-tuple requires trailing comma

    # ENDPOINTS & METHODS:
    # GET /properties/
    # POST /properties/

    # GET - Returns all properties
    def get(self, _request):

        # properties = Property.objects.all()
        properties = Property.objects.prefetch_related(
          Prefetch('bars', queryset=PropertyBar.objects.filter(walking_time_mins__lte=7)),
          Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(walking_time_mins__lte=7)),
          Prefetch('primaries', queryset=PropertyPrimary.objects.filter(walking_time_mins__lte=7)),
          Prefetch('secondaries', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=7)),
          # Prefetch('colleges', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=7)),
          Prefetch('gyms', queryset=PropertyGym.objects.filter(walking_time_mins__lte=7)),
          Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(walking_time_mins__lte=7)),
          Prefetch('tubes', queryset=PropertyTube.objects.filter(walking_time_mins__lte=7)),
          Prefetch('parks', queryset=PropertyPark.objects.filter(walking_time_mins__lte=7)),
          Prefetch('cafes', queryset=PropertyCafe.objects.filter(walking_time_mins__lte=7)),
          Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(walking_time_mins__lte=7)),
        )
        serialized_properties = PopulatedPropertySerializer(
            properties, many=True)

        print('getting all wittle properties')
        #  Response sends data and status back to the user as a response
        return Response(serialized_properties.data, status=status.HTTP_200_OK)



class PropertyWittleSingleView(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly, ) # one-tuple requires trailing comma

    # GET - Returns all properties
    def get(self, _request, pk):

        # properties = Property.objects.filter(pk=pk)
        properties = Property.objects.filter(pk=pk).prefetch_related(
          Prefetch('bars', queryset=PropertyBar.objects.filter(walking_time_mins__lte=7)),
          Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(walking_time_mins__lte=7)),
          Prefetch('primaries', queryset=PropertyPrimary.objects.filter(walking_time_mins__lte=7)),
          Prefetch('secondaries', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=7)),
          Prefetch('colleges', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=7)),
          Prefetch('gyms', queryset=PropertyGym.objects.filter(walking_time_mins__lte=7)),
          Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(walking_time_mins__lte=7)),
          Prefetch('tubes', queryset=PropertyTube.objects.filter(walking_time_mins__lte=7)),
          Prefetch('parks', queryset=PropertyPark.objects.filter(walking_time_mins__lte=7)),
          Prefetch('cafes', queryset=PropertyCafe.objects.filter(walking_time_mins__lte=7)),
          Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(walking_time_mins__lte=7)),
        )
        serialized_properties = PopulatedPropertySerializer(
            properties, many=True)

        print('getting single wittle property')
        #  Response sends data and status back to the user as a response
        return Response(serialized_properties.data, status=status.HTTP_200_OK)
