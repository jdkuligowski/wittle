from rest_framework import serializers # importing the base rest framework serializer class to inherit
from ..models import PropertySupermarket # importing our own model to define within our serializer class

# define our own serializer class - this is generic and will return all fields from the Review model
class PropertySupermarketSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertySupermarket
        fields = '__all__'