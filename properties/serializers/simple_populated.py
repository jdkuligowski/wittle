from .common import PropertySerializer 
from percentiles.serializers.common import PropertyPercentileSerializer


# defining our populated serializer
class BasicPopulatedPropertySerializer(PropertySerializer):
    percentiles = PropertyPercentileSerializer(many=True)
