# importing the base rest framework serializer class to inherit
from rest_framework import serializers
#  importing our own model to define within our serializer class
from ..models import Favourite
from properties.serializers.common import PropertySerializer
# define our own serializer class - this is generic and will return all fields from the Review model


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = '__all__'