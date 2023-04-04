from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import PrimarySerializer
from .models import Primary


# Endpoint: /living/:username
class PrimaryListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        primaries = Primary.objects.all()  # get all fields using all() method
        serialized_primaries = PrimarySerializer(primaries, many=True)
        return Response(serialized_primaries.data, status=status.HTTP_200_OK)
