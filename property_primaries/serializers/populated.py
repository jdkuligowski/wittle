from .common import PropertyPrimarySerializer
from jwt_auth.serializers.common import UserSerializer

# define our own serializer class - this is generic and will return all fields from the Review model
class PopulatedPropertyPrimarySerializer(PropertyPrimarySerializer):
    owner = UserSerializer(many=True)