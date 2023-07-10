from rest_framework import serializers # serializers holds our ModelSerializer class
from ..models import EVSummary # importing Album, but this time going up one level into our albums folder using ..


class EVSummarySerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    class Meta:
        model = EVSummary # define model to serialize from
        fields = '__all__' # fields can be a tuple of field names or __all__ to get all fields

