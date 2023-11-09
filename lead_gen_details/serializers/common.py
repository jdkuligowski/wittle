# importing the base rest framework serializer class to inherit
from rest_framework import serializers
#  importing our own model to define within our serializer class
from ..models import SearchDetails


# define our own serializer class - this is generic and will return all fields from the Review model


class LeadGenDetailsSerialzer(serializers.ModelSerializer):
    class Meta:
        model = SearchDetails
        fields = '__all__'
    
    # def validate(self, data):
    #     # Check if both postcode and area are provided or neither
    #     if 'postcode' in data and 'area' in data:
    #         raise serializers.ValidationError("Provide either a postcode or an area, not both.")
    #     if 'postcode' not in data and 'area' not in data:
    #         raise serializers.ValidationError("Either a postcode or an area is required.")
    #     return data

    # def create(self, validated_data):
    #     if 'area' in validated_data and isinstance(validated_data['area'], dict):
    #         # Assuming area is provided in GeoJSON format
    #         validated_data['area'] = GEOSGeometry(json.dumps(validated_data['area']))
    #     return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     if 'area' in validated_data and isinstance(validated_data['area'], dict):
    #         validated_data['area'] = GEOSGeometry(json.dumps(validated_data['area']))
    #     return super().update(instance, validated_data)