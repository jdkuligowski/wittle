from rest_framework import serializers 
from ..models import ClientDetails 


class ClientDetailsSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = ClientDetails 
        fields = '__all__' 

