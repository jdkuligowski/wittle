# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import Crime
from .serializers.common import CrimeSerializer



class CrimeListView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        crime = Crime.objects.all()  # get all fields using all() method
        serialized_crime = CrimeSerializer(crime, many=True)
        return Response(serialized_crime.data, status=status.HTTP_200_OK)
