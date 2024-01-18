from rest_framework import serializers 
from ..models import AgentSearches 


class AgentSearchesSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = AgentSearches 
        fields = '__all__' 

