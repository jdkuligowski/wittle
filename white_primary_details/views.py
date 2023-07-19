# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import PrimaryDetail
from .serializers.common import PrimaryDetailSerializer


from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

@method_decorator(cache_page(60 * 60), name='dispatch')
class PrimaryDetailView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        primaries = PrimaryDetail.objects.all()  # get all fields using all() method
        serialized_primaries = PrimaryDetailSerializer(primaries, many=True)
        return Response(serialized_primaries.data, status=status.HTTP_200_OK)


class PrimaryDetailSingleView(APIView):
    def get(self, _request, pk):
        primaries = PrimaryDetail.objects.filter(pk=pk) 
        serialized_primaries = PrimaryDetailSerializer(primaries, many=True)
        return Response(serialized_primaries.data, status=status.HTTP_200_OK)

