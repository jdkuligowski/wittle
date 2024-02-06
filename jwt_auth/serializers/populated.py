from jwt_auth.serializers.common import UserSerializer
from rest_framework import serializers 

# from favourites_properties.serializers.common import FavouriteSerializer
# from favourites_properties.serializers.populated import PopulatedFavouriteSerializer
# from property_search_details.serializers.populated import PropertySearchSerializer
# from property_search_scores.serializers.populated import PropertySearchScoreSerializer
# from living_details.serializers.common import LivingSerializer
from white_properties.serializers.common import WhitePropertiesSerializer
from account_details.serializers.common import UsageSerializer
from epc_favourites.serializers.common import FavouriteSerializer
from listing_favourites.serializers.common import ListingFavouriteSerializer
from lead_gen_details.serializers.common import LeadGenDetailsSerialzer
from agent_search_favourites.serializers.common import AgentFavouriteSerializer
from agent_client_details.serializers.common import ClientDetailsSerializer
from agent_client_details.serializers.populated import ClientDetailsPopulatedSerializer
from agent_search_searches.serializers.common import AgentSearchesSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

# define our own serializer class - this is generic and will return all fields from the Review model
class PopulatedUserSerializer(UserSerializer):
    usage_stats = UsageSerializer(many=True)
    epc_favourites = FavouriteSerializer(many=True)
    listing_favourites = ListingFavouriteSerializer(many=True)
    lead_gen_details = LeadGenDetailsSerialzer(many=True)
    agent_saved_properties = AgentFavouriteSerializer(many=True)
    client_details = ClientDetailsPopulatedSerializer(many=True)
    agent_searches = AgentSearchesSerializer(many=True)
    company_favourites = serializers.SerializerMethodField()

    def get_company_favourites(self, obj):
        # Assuming the Company model has a reverse relation to Favourites set up as 'epc_favourites'
        # and the User model has a 'company' ForeignKey.
        if obj.company:
            return FavouriteSerializer(obj.company.epc_favourites.all(), many=True).data
        return []

    class Meta:
        model = User
        fields = '__all__'