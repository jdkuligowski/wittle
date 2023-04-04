from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import SecondarySerializer
from .models import Secondary


# Endpoint: /living/:username
class SecondaryListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        secondaries = Secondary.objects.all()  # get all fields using all() method
        serialized_secondaries = SecondarySerializer(secondaries, many=True)
        return Response(serialized_secondaries.data, status=status.HTTP_200_OK)
