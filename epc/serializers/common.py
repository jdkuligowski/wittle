# importing the base rest framework serializer class to inherit
from rest_framework import serializers
#  importing our own model to define within our serializer class
from ..models import Data
# define our own serializer class - this is generic and will return all fields from the Review model


class EPCSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'