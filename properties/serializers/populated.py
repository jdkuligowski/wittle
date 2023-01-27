
from .common import PropertySerializer 
from favourites_properties.serializers.common import FavouriteSerializer
# from favourites_properties.serializers.populated import PopulatedFavouriteSerializer

from property_primaries.serializers.common import PropertyPrimarySerializer
from property_secondaries.serializers.common import PropertySecondarySerializer
# from property_colleges.serializers.common import PropertyCollegeSerializer
from property_gyms.serializers.common import PropertyGymSerializer
from property_parks.serializers.common import PropertyParkSerializer
from property_tubes.serializers.common import PropertyTubeSerializer
# from property_trains.serializers.common import PropertyTrainSerializer
from property_cafes.serializers.common import PropertyCafeSerializer
from property_supermarkets.serializers.common import PropertySupermarketSerializer
from property_bars.serializers.common import PropertyBarSerializer
from property_restaurants.serializers.common import PropertyRestaurantSerializer
from property_takeaways.serializers.common import PropertyTakeawaySerializer
from percentiles.serializers.common import PropertyPercentileSerializer

# from property_search_scores.serializers.populated import PopulatedPropertySearchScoreSerializer

# defining our populated serializer
class PopulatedPropertySerializer(PropertySerializer):
    # one task in this class is to define our field to populate
    favourites = FavouriteSerializer(many=True)
    primaries = PropertyPrimarySerializer(many=True)
    secondaries = PropertySecondarySerializer(many=True)
    # colleges = PropertyCollegeSerializer(many=True)
    gyms = PropertyGymSerializer( many=True)
    parks = PropertyParkSerializer(many=True)
    tubes = PropertyTubeSerializer(many=True)
    # trains = PropertyTrainSerializer(many=True)
    cafes = PropertyCafeSerializer(many=True)
    supermarkets = PropertySupermarketSerializer(many=True)
    bars = PropertyBarSerializer(many=True)
    restaurants = PropertyRestaurantSerializer(many=True)
    takeaways = PropertyTakeawaySerializer(many=True)
    percentiles = PropertyPercentileSerializer(many=True)
    # property_search_scores = PopulatedPropertySearchScoreSerializer(many=True)

    def __str__(self):
          return(PropertyGymSerializer)