from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import PubSerializer
from .models import Pub


# Endpoint: /living/:username
class PubListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        pubs = Pub.objects.all()  # get all fields using all() method
        serialized_pubs = PubSerializer(pubs, many=True)
        return Response(serialized_pubs.data, status=status.HTTP_200_OK)
