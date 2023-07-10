# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import PrimaryDetail
from .serializers.common import PrimaryDetailSerializer



class PrimaryDetailView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        primaries = PrimaryDetail.objects.all()  # get all fields using all() method
        serialized_primaries = PrimaryDetailSerializer(primaries, many=True)
        return Response(serialized_primaries.data, status=status.HTTP_200_OK)
