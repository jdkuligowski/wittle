from rest_framework import serializers
from ..models import Branches
# define our own serializer class - this is generic and will return all fields from the Review model


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branches
        fields = '__all__'