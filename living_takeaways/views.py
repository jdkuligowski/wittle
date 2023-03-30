from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import TakeawaySerializer
from .models import Takeaway


# Endpoint: /living/:username
class TakeawayListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        takeaways = Takeaway.objects.all()  # get all fields using all() method
        serialized_takeaways = TakeawaySerializer(takeaways, many=True)
        return Response(serialized_takeaways.data, status=status.HTTP_200_OK)
