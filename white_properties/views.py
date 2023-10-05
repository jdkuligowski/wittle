# rest_framework imports
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
# status has a list of status codes we can use in our Response
from rest_framework import status
# Create your views here.
from .models import Property
from .serializers.common import WhitePropertiesSerializer


from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

@method_decorator(cache_page(60 * 60), name='dispatch')
class PropertyFullView(APIView):
    # GET - Returns all favourites
    def get(self, _request):
        properties = Property.objects.all()  # get all fields using all() method
        serialized_properties = WhitePropertiesSerializer(properties, many=True)
        return Response(serialized_properties.data, status=status.HTTP_200_OK)


class PropertyCompanyView(APIView):
    def get(self, _request, fk):
        properties = Property.objects.filter(company_id=fk) 
        serialized_properties = WhitePropertiesSerializer(properties, many=True)
        return Response(serialized_properties.data, status=status.HTTP_200_OK)

