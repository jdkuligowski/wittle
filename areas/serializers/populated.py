from .common import AreaSerializer

from area_primaries.serializers.common import AreaPrimarySerializer

class PopulatedAreaSerializer(AreaSerializer):
  primares = AreaPrimarySerializer(many=True)