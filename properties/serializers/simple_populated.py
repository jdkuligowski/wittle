from .common import PropertySerializer 
from percentiles.serializers.common import PropertyPercentileSerializer


#┬ádefining our populated serializer
class BasicPopulatedPropertySerializer(PropertySerializer):
    percentiles = PropertyPercentileSerializer(many=True)
