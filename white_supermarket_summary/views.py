# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import SupermarketSummary
from .serializers.common import SupermarketSummarySerializer


from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

@method_decorator(cache_page(60 * 60), name='dispatch')
class SupermarketSummaryView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        supermarkets = SupermarketSummary.objects.all()  # get all fields using all() method
        serialized_supermarkets = SupermarketSummarySerializer(supermarkets, many=True)
        return Response(serialized_supermarkets.data, status=status.HTTP_200_OK)
