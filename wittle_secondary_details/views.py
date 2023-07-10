# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import SecondaryDetail
from .serializers.common import SecondaryDetailSerializer
from .serializers.populated import PopulatedSecondaryDetailsSerializer



class SecondaryDetailView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        secondaries = SecondaryDetail.objects.all()  # get all fields using all() method
        serialized_secondaries = PopulatedSecondaryDetailsSerializer(secondaries, many=True)
        return Response(serialized_secondaries.data, status=status.HTTP_200_OK)


class SecondaryDetailSingleView(APIView):
    def get(self, _request, pk):
        secondaries = SecondaryDetail.objects.filter(pk=pk) 
        serialized_secondaries = PopulatedSecondaryDetailsSerializer(secondaries, many=True)
        return Response(serialized_secondaries.data, status=status.HTTP_200_OK)

