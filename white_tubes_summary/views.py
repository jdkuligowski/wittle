# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import TubeSummary
from .serializers.common import TubeListSerializer



class TubeSummaryView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        tubes = TubeSummary.objects.all()  # get all fields using all() method
        serialized_tubes = TubeListSerializer(tubes, many=True)
        return Response(serialized_tubes.data, status=status.HTTP_200_OK)