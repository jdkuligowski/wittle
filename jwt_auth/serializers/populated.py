from jwt_auth.serializers.common import UserSerializer
from favourites_properties.serializers.common import FavouriteSerializer
from favourites_properties.serializers.populated import PopulatedFavouriteSerializer
from property_search_details.serializers.populated import PropertySearchSerializer
from property_search_scores.serializers.populated import PropertySearchScoreSerializer
from living_details.serializers.common import LivingSerializer
from white_properties.serializers.common import WhitePropertiesSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

# define our own serializer class - this is generic and will return all fields from the Review model
class PopulatedUserSerializer(UserSerializer):
    favourites = FavouriteSerializer(many=True)
    property_search_details = PropertySearchSerializer(many=True)
    living_details = LivingSerializer(many=True)
    white_properties = WhitePropertiesSerializer(many=True)
    class Meta:
        model = User
        fields = '__all__'