from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import TubeSerializer
from .models import Tube


# View that allows us to add a new favourite property
class TubeListView(APIView):

        # GET - Returns all favourites
    def get(self, _request):

        tubes = Tube.objects.all() 
        serialized_tubes = TubeSerializer(tubes, many=True)
        return Response(serialized_tubes.data, status=status.HTTP_200_OK) # Response sends data and status back to the user as a response

