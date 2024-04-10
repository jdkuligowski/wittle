# importing the base rest framework serializer class to inherit
from rest_framework import serializers
#  importing our own model to define within our serializer class
from ..models import Campaigns


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaigns
        fields = '__all__'
    