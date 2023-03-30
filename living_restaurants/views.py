from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import RestaurantSerializer
from .models import Restaurant


# Endpoint: /living/:username
class RestaurantListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        restaurants = Restaurant.objects.all()  # get all fields using all() method
        serialized_restaurtants = RestaurantSerializer(restaurants, many=True)
        return Response(serialized_restaurtants.data, status=status.HTTP_200_OK)
