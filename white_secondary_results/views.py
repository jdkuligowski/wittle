# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import SecondaryResults
from .serializers.common import SecondaryResultsSerializer


from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

@method_decorator(cache_page(60 * 60), name='dispatch')
class SecondaryResultsView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        secondaries = SecondaryResults.objects.all()  # get all fields using all() method
        serialized_secondaries = SecondaryResultsSerializer(secondaries, many=True)
        return Response(serialized_secondaries.data, status=status.HTTP_200_OK)
