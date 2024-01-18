from rest_framework import serializers 
from ..models import ClientSearches 


class ClientSearchSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = ClientSearches 
        fields = '__all__' 

