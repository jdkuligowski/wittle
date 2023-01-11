from .common import PropertySearchSerializer
from property_search_scores.serializers.common import PropertySearchScoreSerializer
from jwt_auth.serializers.common import UserSerializer

# define our own serializer class - this is generic and will return all fields from the Review model
class PopulatedPropertySearchSerializer(PropertySearchSerializer):
    owner = UserSerializer()
    # result_id = PropertySearchScoreSerializer(many=True)