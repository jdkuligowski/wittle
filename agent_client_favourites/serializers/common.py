from rest_framework import serializers 
from ..models import ClientFavourites 


class ClientFavouritesSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = ClientFavourites 
        fields = '__all__' 

