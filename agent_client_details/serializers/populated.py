from rest_framework import serializers 
from agent_client_favourites.serializers.common import ClientFavouritesSerializer
from agent_client_details.models import ClientDetails
from agent_client_searches.serializers.common import ClientSearchSerializer

# define our own serializer class - this is generic and will return all fields from the Review model
class ClientDetailsPopulatedSerializer(serializers.ModelSerializer):
    client_saved_properties = ClientFavouritesSerializer(many=True)
    client_saved_searches = ClientSearchSerializer(many=True)

    class Meta:
        model = ClientDetails
        fields = '__all__'