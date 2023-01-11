from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import TrainSerializer
from .models import Train


# View that allows us to add a new favourite property
class TrainListView(APIView):

        # GET - Returns all favourites
    def get(self, _request):

        trains = Train.objects.all() 
        serialized_trains = TrainSerializer(trains, many=True)
        return Response(serialized_trains.data, status=status.HTTP_200_OK) # Response sends data and status back to the user as a response

