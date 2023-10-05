from rest_framework import serializers # serializers holds our ModelSerializer class
from ..models import Property # importing Album, but this time going up one level into our albums folder using ..
from client_list.serializers.common import CompanySerializer

class WhitePropertiesSerializer(serializers.ModelSerializer):
    # define a Meta subclass that details which model and fields to serialize
    company = CompanySerializer()

    class Meta:
        model = Property # define model to serialize from
        fields = '__all__' # fields can be a tuple of field names or __all__ to get all fields

