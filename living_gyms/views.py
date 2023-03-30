from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import GymSerializer
from .models import Gym


# Endpoint: /living/:username
class GymListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        gyms = Gym.objects.all()  # get all fields using all() method
        serialized_gyms = GymSerializer(gyms, many=True)
        return Response(serialized_gyms.data, status=status.HTTP_200_OK)
