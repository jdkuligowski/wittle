from rest_framework import serializers
from ..models import City
# define our own serializer class - this is generic and will return all fields from the Review model


class LivingMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'