from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import LivingSerializer
from .models import Living


# Endpoint: /living/:username
class LivingResultsView(APIView):
      def get_living(self, username):
        try:
            return Living.objects.get(username=username)
        except Living.DoesNotExist:
            raise NotFound("Search not found")

      # GET - returns the things users have inputted that they want to see relating to wittle living

      def get(self, _request, username):
        details = self.get_living(username)
        print('user details --->', details)
        serialized_user = LivingSerializer(details)
        return Response(serialized_user.data, status.HTTP_200_OK)

      # POST - allows users to post the things they care about to the database

      def post(self, request):
        request.data['owner'] = request.user.id
        print('request ->', request.data)
        print(request.user.id)
        living_details_to_add = LivingSerializer(data=request.data)
        try:
          living_details_to_add.is_valid()
          print(living_details_to_add.is_valid())
          print(living_details_to_add.errors)
          living_details_to_add.save()
          return Response(living_details_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            print('validation error')
            return Response(living_details_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('exception error')
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


        
      
class LivingEditView(APIView):
    permission_classes = (IsAuthenticated, )
    def get_living(self, pk):
        try:
            return Living.objects.get(pk=pk)
        except Living.DoesNotExist:
            raise NotFound("Search not found")

    def put(self, request, pk):
        living_to_update = self.get_living(pk=pk)
        # print(type(property_search_to_update))
        deserialized_search = LivingSerializer(
            living_to_update, request.data)
        try:
            deserialized_search.is_valid()
            print(deserialized_search.is_valid())
            print(deserialized_search.errors)
            deserialized_search.save()

            return Response(deserialized_search.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)
