from living_colleges.serializers.common import CollegeSerializer
from living_primaries.serializers.common import PrimarySerializer
from living_secondaries.serializers.common import SecondarySerializer
from living_restaurants.serializers.common import RestaurantSerializer
from living_pubs.serializers.common import PubSerializer
from living_takeaways.serializers.common import TakeawaySerializer
from living_gyms.serializers.common import GymSerializer
from .common import LivingMasterSerializer



class PopulatedLivingMasterSerializer(LivingMasterSerializer):
  gyms = GymSerializer(many=True)
  restaurants = RestaurantSerializer(many=True)
  pubs = PubSerializer(many=True)
  takeaways = TakeawaySerializer(many=True)
  primaries = PrimarySerializer(many=True)
  secondaries = SecondarySerializer(many=True)
  colleges = CollegeSerializer(many=True)