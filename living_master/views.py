from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import LivingMasterSerializer
from .serializers.populated import PopulatedLivingMasterSerializer
from .models import  City


# Endpoint: /living/:username
class CityListVew(APIView):
    def get(self, _request):
        cities = City.objects.all()  # get all fields using all() method
        serialized_cities = PopulatedLivingMasterSerializer(cities, many=True)
        return Response(serialized_cities.data, status=status.HTTP_200_OK)
