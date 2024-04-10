from rest_framework import serializers 
from ..models import Tracker 


class TrackerSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = Tracker 
        fields = '__all__' 

