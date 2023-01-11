from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import FavouriteSerializer
from .serializers.populated import PopulatedFavouriteSerializer
from .models import Favourite


# View that allows us to add a new favourite property
class FavouriteListView(APIView):
    permission_classes = (IsAuthenticated, )

    # GET - Returns all favourites
    def get(self, _request):
        # in this controller, we just want to get all the items inside the albums table and return it as a response
        favourites = Favourite.objects.all()  # get all fields using all() method
        # .all() returns a QuerySet, we need to use the serializer to convert this into a python datatype
        # if we expect multiple items in the QuerySet, use many=True
        serialized_favourites = FavouriteSerializer(favourites, many=True)
        # print('serialized data ->', serialized_properties.data)
        #  Response sends data and status back to the user as a response
        return Response(serialized_favourites.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        print('request ->', request.data)
        print(request.user.id)
        favourite_to_add = FavouriteSerializer(data=request.data)
        try:
            print('in the try')
            print(favourite_to_add.is_valid())
            print(favourite_to_add.errors)
            favourite_to_add.is_valid()
            favourite_to_add.save()
            return Response(favourite_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            print('validation error')
            return Response(favourite_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('exception error')
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


    # def put(self, request, pk):
    #     property_search_to_update = self.get_property_search(pk=pk)
    #     print(type(property_search_to_update))
    #     deserialized_search = PropertySearchSerializer(
    #         property_search_to_update, request.data)
    #     try:
    #         deserialized_search.is_valid()
    #         print(deserialized_search.is_valid())
    #         print(deserialized_search.errors)
    #         deserialized_search.save()

    #         return Response(deserialized_search.data, status.HTTP_202_ACCEPTED)
    #     except Exception as e:
    #         print(e)
    #         return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)

    # def delete(self, request):
    #     favourite_to_delete = FavouriteSerializer(data=request.data)
    #     print('hit the delete route')
    #     # if favourite_to_delete.owner != request.user:
    #     #     print('WE CANT DELETE RECORD')
    #     #     raise PermissionDenied()
    #     favourite_to_delete.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


# Endpoint: /favourites/:id
class FavouriteDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_favourite(self, property):
        try:
            return Favourite.objects.get(property=property)
        except Favourite.DoesNotExist:
            raise NotFound("Favourite not found")

    def delete(self, request, property):
        favourite_to_delete = self.get_favourite(property)
        if favourite_to_delete.owner != request.user:
            print('WE CANT DELETE RECORD')
            raise PermissionDenied()
        favourite_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
