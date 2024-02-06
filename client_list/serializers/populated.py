from rest_framework import serializers 
from epc_favourites.serializers.common import FavouriteSerializer


# define our own serializer class - this is generic and will return all fields from the Review model
class PopulatedCompanySerializers(serializers.ModelSerializer):
    epc_favourites = FavouriteSerializer(many=True)