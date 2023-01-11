from .common import FavouriteSerializer
from jwt_auth.serializers.common import UserSerializer
from properties.serializers.common import PropertySerializer
from properties.serializers.populated import PopulatedPropertySerializer

# define our own serializer class - this is generic and will return all fields from the Review model
class PopulatedFavouriteSerializer(FavouriteSerializer):
    owner = UserSerializer()
    property = PopulatedPropertySerializer(many=True)