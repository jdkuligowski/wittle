from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .serializers.common import LocationSerializer
from .models import Location


# View that allows us to add a new favourite property
class LocationsListView(APIView):

        # GET - Returns all favourites
    def get(self, _request):

        locations = Location.objects.all() 
        serialized_locations = LocationSerializer(locations, many=True)
        return Response(serialized_locations.data, status=status.HTTP_200_OK) # Response sends data and status back to the user as a response

