from rest_framework import serializers 
from ..models import AgentFavourites 


class AgentFavouriteSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = AgentFavourites 
        fields = '__all__' 

