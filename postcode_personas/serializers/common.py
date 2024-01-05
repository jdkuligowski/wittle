# importing the base rest framework serializer class to inherit
from rest_framework import serializers
#  importing our own model to define within our serializer class
from ..models import PersonaDetails



class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonaDetails
        fields = '__all__'