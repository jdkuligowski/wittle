from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated


from .serializers.common import EmailsSerializer
from .models import List


# Endpoint: /living/:username
class EmailView(APIView):

      # POST - allows users to post email address to the database

      def post(self, request):
        email_to_add = EmailsSerializer(data=request.data)
        try:
          email_to_add.is_valid()
          print(email_to_add.is_valid())
          print(email_to_add.errors)
          email_to_add.save()
          return Response(email_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            print('validation error')
            return Response(email_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('exception error')
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


        