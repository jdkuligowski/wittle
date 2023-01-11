# rest_framework imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status # status has a list of status codes we can use in our Response
from rest_framework.exceptions import NotFound # NotFound is going to provide us with an exception that sends a 404 response to the end user

# custom imports
from .models import Area # model will be used to query the db
from .serializers.common import AreaSerializer
# from .serializers.populated import PopulatedPropertySerializer # imports the populated serializer that includes the reviews field

# import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class AreaListView(APIView):

    # GET - Returns all areas
    def get(self, _request):
        # in this controller, we just want to get all the items inside the albums table and return it as a response
        areas = Area.objects.all() # get all fields using all() method
        # .all() returns a QuerySet, we need to use the serializer to convert this into a python datatype
        serialized_areas = AreaSerializer(areas, many=True) # if we expect multiple items in the QuerySet, use many=True
        # print('serialized data ->', serialized_properties.data)
        return Response(serialized_areas.data, status=status.HTTP_200_OK) # Response sends data and status back to the user as a response


# ENDPOINT: /properties/:pk/
class AreaDetailView(APIView):

    # CUSTOM FUNCTION
    # Purpose of this function is to attempt the find a specific property returning that property, and throwing a 404 if failed
    def get_area(self, pk):
        try:
            # pk= is us detailing that we want to look in whatever column is the PRIMARY KEY column
            # the second pk is the captured value
            # this is the same as saying in SQL: WHERE id = 1
            return Area.objects.get(pk=pk)
        except Area.DoesNotExist as e:
            print(e)
            raise NotFound({ 'detail': str(e) })

    # GET - Return 1 item from the property table
    def get(self, _request, pk):
        area = self.get_area(pk)
        print('area --->', area)
        serialized_area = AreaSerializer(property)
        return Response(serialized_area.data, status.HTTP_200_OK)