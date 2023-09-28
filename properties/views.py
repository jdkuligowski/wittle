# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from property_restaurants.serializers.common import PropertyRestaurantSerializer
from property_gyms.serializers.common import PropertyGymSerializer
from property_bars.serializers.common import PropertyBarSerializer
from .serializers.populated import PopulatedPropertySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
#  NotFound is going to provide us with an exception that sends a 404 response to the end user
from rest_framework.exceptions import NotFound
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend


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
from property_trains.models import PropertyTrain
from property_parks.models import PropertyPark
from percentiles.models import PropertyPercentiles
# from .models import PropertyTube

from .models import Property  #  model will be used to query the db
from .filters import PropertyFilter, WittlePropertyFilter
from .serializers.common import PropertySerializer
from .serializers.simple_populated import BasicPopulatedPropertySerializer
# imports the populated serializer that includes the reviews field


# import permissions


class PropertyListView(generics.ListCreateAPIView):
    # GET - Returns all properties
        queryset = Property.objects.prefetch_related(
          Prefetch('percentiles', queryset=PropertyPercentiles.objects.all())
        )
        serializer_class = BasicPopulatedPropertySerializer
        filter_backends = [DjangoFilterBackend]
        filterset_class = PropertyFilter

# ENDPOINT: /properties/:pk/


class PropertyDetailView(APIView):

    # CUSTOM FUNCTION
    # Purpose of this function is to attempt the find a specific property returning that property, and throwing a 404 if failed
    def get(self, _request, pk):

            # properties = Property.objects.filter(pk=pk)
            properties = Property.objects.filter(pk=pk).prefetch_related(
              Prefetch('bars', queryset=PropertyBar.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('primaries', queryset=PropertyPrimary.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('secondaries', queryset=PropertySecondary.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('colleges', queryset=PropertySecondary.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('gyms', queryset=PropertyGym.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('tubes', queryset=PropertyTube.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('parks', queryset=PropertyPark.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('cafes', queryset=PropertyCafe.objects.filter(
                  walking_time_mins__lte=15)),
              Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(
                  walking_time_mins__lte=15)),
            )
            serialized_properties = PopulatedPropertySerializer(
                properties, many=True)

            print('getting single normal property')
            #  Response sends data and status back to the user as a response
            return Response(serialized_properties.data, status=status.HTTP_200_OK)


# class PropertyWittleView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticatedOrReadOnly, ) # one-tuple requires trailing comma

        # serializer_class = PopulatedPropertySerializer
        # filter_backends = [DjangoFilterBackend]
        # filterset_class = WittlePropertyFilter


        # def get_queryset(self):
        #     queryset = Property.objects.all()

        #     queryset = queryset.prefetch_related(
        #         Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(walking_time_mins__lte=self.request.query_params.get('restaurants_dist'))),
        #         Prefetch('bars', queryset=PropertyBar.objects.filter(walking_time_mins__lte=self.request.query_params.get('pubs_dist'))),
        #         Prefetch('cafes', queryset=PropertyCafe.objects.filter(walking_time_mins__lte=self.request.query_params.get('cafes_dist'))),
        #         Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(walking_time_mins__lte=self.request.query_params.get('takeaways_dist'))),
        #         Prefetch('tubes', queryset=PropertyTube.objects.filter(walking_time_mins__lte=self.request.query_params.get('tubes_dist'))),
        #         Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(walking_time_mins__lte=self.request.query_params.get('supermarkets_dist'))),
        #         Prefetch('parks', queryset=PropertyPark.objects.filter(walking_time_mins__lte=self.request.query_params.get('park_dist'))),
        #         Prefetch('gyms', queryset=PropertyGym.objects.filter(walking_time_mins__lte=self.request.query_params.get('gyms_dist'))),
        #         Prefetch('primaries', queryset=PropertyPrimary.objects.filter(walking_time_mins__lte=self.request.query_params.get('primaries_dist'))),
        #         Prefetch('secondaries', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=self.request.query_params.get('secondaries_dist'))),
        #         Prefetch('colleges', queryset=PropertyCollege.objects.filter(walking_time_mins__lte=self.request.query_params.get('colleges_dist'))),
        #         Prefetch('trains', queryset=PropertyTrain.objects.filter(walking_time_mins__lte=self.request.query_params.get('trains_dist'))),
        #     )

        #     queryset = self.filter_queryset(queryset)
        #     return queryset

        # def get_queryset(self):
        #     queryset = Property.objects.all()
            
        #     restaurants_dist = self.request.query_params.get('restaurants_dist')
        #     if restaurants_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(walking_time_mins__lte=restaurants_dist))
        #         )
            
        #     pubs_dist = self.request.query_params.get('pubs_dist')
        #     if pubs_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('bars', queryset=PropertyBar.objects.filter(walking_time_mins__lte=pubs_dist))
        #         )
            
        #     cafes_dist = self.request.query_params.get('cafes_dist')
        #     if cafes_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('cafes', queryset=PropertyCafe.objects.filter(walking_time_mins__lte=cafes_dist))
        #         )
            
        #     takeaways_dist = self.request.query_params.get('takeaways_dist')
        #     if takeaways_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(walking_time_mins__lte=takeaways_dist))
        #         )
            
        #     tubes_dist = self.request.query_params.get('tubes_dist')
        #     if tubes_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('tubes', queryset=PropertyTube.objects.filter(walking_time_mins__lte=tubes_dist))
        #         )
            
        #     supermarkets_dist = self.request.query_params.get('tubes_dist')
        #     if supermarkets_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(walking_time_mins__lte=supermarkets_dist))
        #         )
            
        #     park_dist = self.request.query_params.get('park_dist')
        #     if park_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('parks', queryset=PropertyPark.objects.filter(walking_time_mins__lte=park_dist))
        #         )
            
        #     gyms_dist = self.request.query_params.get('gyms_dist')
        #     if gyms_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('gyms', queryset=PropertyGym.objects.filter(walking_time_mins__lte=gyms_dist))
        #         )
            
        #     primaries_dist = self.request.query_params.get('primaries_dist')
        #     if primaries_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('primaries', queryset=PropertyPrimary.objects.filter(walking_time_mins__lte=primaries_dist))
        #         )
            
        #     secondaries_dist = self.request.query_params.get('secondaries_dist')
        #     if secondaries_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('secondaries', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=secondaries_dist))
        #         )
            
        #     colleges_dist = self.request.query_params.get('colleges_dist')
        #     if colleges_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('colleges', queryset=PropertyCollege.objects.filter(walking_time_mins__lte=colleges_dist))
        #         )
            
        #     trains_dist = self.request.query_params.get('trains_dist')
        #     if trains_dist:
        #         queryset = queryset.prefetch_related(
        #             Prefetch('trains', queryset=PropertyTrain.objects.filter(walking_time_mins__lte=trains_dist))
        #         )
            
        #     # add other prefetch_related calls here...

        #     queryset = self.filter_queryset(queryset)
        #     return queryset



    # ENDPOINTS & METHODS:
    # GET /properties/
    # POST /properties/

# class PropertyWittleView(generics.ListCreateAPIView):

#         serializer_class = PopulatedPropertySerializer
#         filter_backends = [DjangoFilterBackend]
#         filterset_class = WittlePropertyFilter


#         def get_queryset(self):
              
#               queryset = Property.objects.prefetch_related(
#                         Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('bars', queryset=PropertyBar.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('cafes', queryset=PropertyCafe.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('gyms', queryset=PropertyGym.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('primaries', queryset=PropertyPrimary.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('secondaries', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('colleges', queryset=PropertyCollege.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('tubes', queryset=PropertyTube.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('parks', queryset=PropertyPark.objects.filter(walking_time_mins__lte=8)),
#                         Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(walking_time_mins__lte=8)),
#                     ).all()
              
        
#               queryset = self.filter_queryset(queryset)
#               return queryset


class PropertyWittleView(APIView):

    # GET - Returns all properties
    def get(self, _request):

        # filter properties using the query parameters
        properties = Property.objects.prefetch_related(
            Prefetch('restaurants', queryset=PropertyRestaurant.objects.filter(walking_time_mins__lte=7)),
            Prefetch('bars', queryset=PropertyBar.objects.filter(walking_time_mins__lte=7)),
            Prefetch('takeaways', queryset=PropertyTakeaways.objects.filter(walking_time_mins__lte=7)),
            Prefetch('cafes', queryset=PropertyCafe.objects.filter(walking_time_mins__lte=7)),
            Prefetch('gyms', queryset=PropertyGym.objects.filter(walking_time_mins__lte=7)),
            Prefetch('primaries', queryset=PropertyPrimary.objects.filter(walking_time_mins__lte=7)),
            Prefetch('secondaries', queryset=PropertySecondary.objects.filter(walking_time_mins__lte=7)),
            Prefetch('colleges', queryset=PropertyCollege.objects.filter(walking_time_mins__lte=7)),
            Prefetch('tubes', queryset=PropertyTube.objects.filter(walking_time_mins__lte=7)),
            Prefetch('parks', queryset=PropertyPark.objects.filter(walking_time_mins__lte=7)),
            Prefetch('supermarkets', queryset=PropertySupermarket.objects.filter(walking_time_mins__lte=7)),
        ).all()

        # serialize the properties
        serialized_properties = PopulatedPropertySerializer(properties, many=True)

        # return the serialized data
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
