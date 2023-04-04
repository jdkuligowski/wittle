from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import CollegeSerializer
from .models import College


# Endpoint: /living/:username
class CollegeListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        colleges = College.objects.all()  # get all fields using all() method
        serialized_colleges = CollegeSerializer(colleges, many=True)
        return Response(serialized_colleges.data, status=status.HTTP_200_OK)
