from rest_framework import serializers
from .common import SecondaryDetailSerializer
from ..models import SecondaryDetail

from white_secondary_results.serializers.common import SecondaryResultsSerializer
from white_secondary_results.models import SecondaryResults




#  defining our populated serializer
class PopulatedSecondaryDetailsSerializer(SecondaryDetailSerializer):
    # favourites = FavouriteSerializer(many=True)
    results = serializers.SerializerMethodField()

    class Meta:
        model = SecondaryDetail
        fields = '__all__'

    def get_results(self, obj):
        results = SecondaryResults.objects.filter(urn=obj.urn)
        return SecondaryResultsSerializer(results, many=True).data