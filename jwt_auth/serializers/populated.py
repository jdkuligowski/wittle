from jwt_auth.serializers.common import UserSerializer
from favourites_properties.serializers.common import FavouriteSerializer
from favourites_properties.serializers.populated import PopulatedFavouriteSerializer
from property_search_details.serializers.populated import PropertySearchSerializer
from property_search_scores.serializers.populated import PropertySearchScoreSerializer
from living_details.serializers.common import LivingSerializer
from white_properties.serializers.common import WhitePropertiesSerializer
from account_details.serializers.common import UsageSerializer
from epc_favourites.serializers.common import FavouriteSerializer
from listing_favourites.serializers.common import ListingFavouriteSerializer
from lead_gen_details.serializers.common import LeadGenDetailsSerialzer

from django.contrib.auth import get_user_model
User = get_user_model()

# define our own serializer class - this is generic and will return all fields from the Review model
class PopulatedUserSerializer(UserSerializer):
    # favourites = FavouriteSerializer(many=True)
    # property_search_details = PropertySearchSerializer(many=True)
    # living_details = LivingSerializer(many=True)
    usage_stats = UsageSerializer(many=True)
    epc_favourites = FavouriteSerializer(many=True)
    listing_favourites = ListingFavouriteSerializer(many=True)
    lead_gen_details = LeadGenDetailsSerialzer(many=True)
    class Meta:
        model = User
        fields = '__all__'