from .common import SoldPropertySerializer
from ..models import Property
from rest_framework import serializers
from sold_property_prices.serializers.common import SoldPricesSerializer

class PopulatedSoldPropertySerializer(SoldPropertySerializer):
  sold_prices = SoldPricesSerializer(read_only=True)

  class Meta:
        model = Property
        fields = '__all__'