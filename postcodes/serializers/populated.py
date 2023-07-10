
from .common import PostcodeSerializer
from ..models import Postcodes
from rest_framework import serializers

from white_greenspace_lsoa.serializers.common import ParksLSOASerializer
from white_greenspace_postcode.serializers.common import ParksPostcodeSerializer
from white_crime_summary.serializers.common import CrimeSerializer
from white_ev_summary.serializers.common import EVSummarySerializer
from white_tubes_summary.serializers.common import TubeListSerializer
from white_fitness_summary.serializers.common import FitnessSummarySerializer
from white_restaurants_summary.serializers.common import RestaurantSummarySerializer
from white_supermarket_summary.serializers.common import SupermarketSummarySerializer

from white_greenspace_lsoa.models import ParksLsoa
from white_crime_summary.models import Crime



#  defining our populated serializer


class PopulatedPostcodeSerializer(PostcodeSerializer):
    # favourites = FavouriteSerializer(many=True)
    parks_lsoa = serializers.SerializerMethodField()
    parks_postcode = ParksPostcodeSerializer(read_only=True)
    crime = serializers.SerializerMethodField()
    ev = EVSummarySerializer(read_only=True)
    tubes = TubeListSerializer(read_only=True)
    fitness = FitnessSummarySerializer(read_only=True)
    restaurants = RestaurantSummarySerializer(read_only=True)
    supermarkets = SupermarketSummarySerializer(read_only=True)

    class Meta:
        model = Postcodes
        fields = '__all__'

    def get_parks_lsoa(self, obj):
        parks = ParksLsoa.objects.filter(lsoa_name=obj.lsoa)
        return ParksLSOASerializer(parks, many=True).data

    def get_crime(self, obj):
        crime = Crime.objects.filter(lsoa_name=obj.lsoa)
        return CrimeSerializer(crime, many=True).data
