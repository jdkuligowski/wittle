from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import SupermarketSerializer
from .models import Supermarket


# Endpoint: /living/:username
class SupermarketListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        supermarket = Supermarket.objects.all()  # get all fields using all() method
        serialized_supermarkets = SupermarketSerializer(supermarket, many=True)
        return Response(serialized_supermarkets.data, status=status.HTTP_200_OK)
