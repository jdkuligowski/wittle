from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import PropertySearchSerializer
from .serializers.populated import PopulatedPropertySearchSerializer
from .models import PropertySearch


# SQL / Django:
# Enter new property search -> POST /property-search/

# View that allows us to post a new search
class PropertySearchListView(APIView):
    # permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['owner'] = request.user.id
        print('request ->', request.data)
        print(request.user.id)
        property_search_to_add = PropertySearchSerializer(data=request.data)
        try:
            print('in the try')
            property_search_to_add.is_valid()
            print(property_search_to_add.is_valid())
            print(property_search_to_add.errors)
            property_search_to_add.save()
            return Response(property_search_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            print('validation error')
            return Response(property_search_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('exception error')
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


# View that allows us to post a new search for people who don't have access
# We have set a profile up for this and have an owner value of '31' that is called to post the search to the database
class PropertyAdminSearchListView(APIView):
    authentication_classes = []

    def post(self, request):
        request.data['owner'] = 31
        print('request ->', request.data)
        print(request.user.id)
        property_search_to_add = PropertySearchSerializer(data=request.data)
        try:
            print('in the try')
            property_search_to_add.is_valid()
            print(property_search_to_add.is_valid())
            print(property_search_to_add.errors)
            property_search_to_add.save()
            return Response(property_search_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            print('validation error')
            return Response(property_search_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('exception error')
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


class PropertyAdminSearchDetailView(APIView):
    authentication_classes = []
    def get_property_search(self, pk):
        try:
            return PropertySearch.objects.get(pk=pk)
        except PropertySearch.DoesNotExist:
            raise NotFound("Search not found")

    def put(self, request, pk):
        property_search_to_update = self.get_property_search(pk=pk)
        # print(type(property_search_to_update))
        deserialized_search = PropertySearchSerializer(
            property_search_to_update, request.data)
        try:
            deserialized_search.is_valid()
            # print(deserialized_search.is_valid())
            # print(deserialized_search.errors)
            deserialized_search.save()

            return Response(deserialized_search.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


# Endpoint: /property-search/:id
class PropertySearchDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_property_search(self, pk):
        try:
            return PropertySearch.objects.get(pk=pk)
        except PropertySearch.DoesNotExist:
            raise NotFound("Search not found")

    def delete(self, _request, pk):
        property_search_to_delete = self.get_property_search(pk)
        print('hit the delete route')
        # if property_search_to_delete.owner != request.user:
        #     print('WE CANT DELETE RECORD')
        #     raise PermissionDenied()
        property_search_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # GET - Return 1 item from the property search table
    def get(self, _request, pk):
        print("getting property search criteria")
        property_search = self.get_property_search(pk)
        print('property --->', property_search)
        serialized_property_search = PropertySearchSerializer(
            property_search, many=True)
        # print(serialized_property_search.data.is_valid())
        return Response(serialized_property_search.data, status.HTTP_200_OK)


    # PUT - This function will update the existing record with new data
    def put(self, request, pk):
        property_search_to_update = self.get_property_search(pk=pk)
        # print(type(property_search_to_update))
        deserialized_search = PropertySearchSerializer(
            property_search_to_update, request.data)
        try:
            # print('in the backend try-start')
            deserialized_search.is_valid()
            # print(deserialized_search.is_valid())
            # print(deserialized_search.errors)
            deserialized_search.save()
            # print('in the backend try-end')

            return Response(deserialized_search.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)
