from rest_framework import serializers # importing the base rest framework serializer class to inherit
from ..models import PropertyCafe #¬†importing our own model to define within our serializer class

# define our own serializer class - this is generic and will return all fields from the Review model
class PropertyCafeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyCafe
        fields = '__all__'