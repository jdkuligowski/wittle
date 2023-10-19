from rest_framework import serializers 
from ..models import Favourite 


class ListingFavouriteSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = Favourite 
        fields = '__all__' 

