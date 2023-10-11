from rest_framework import serializers 
from ..models import Usage 


class UsageSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = Usage 
        fields = '__all__' 

