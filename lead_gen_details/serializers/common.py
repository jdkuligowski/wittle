# importing the base rest framework serializer class to inherit
from rest_framework import serializers
#  importing our own model to define within our serializer class
from ..models import SearchDetails
# define our own serializer class - this is generic and will return all fields from the Review model


class LeadGenDetailsSerialzer(serializers.ModelSerializer):
    class Meta:
        model = SearchDetails
        fields = '__all__'