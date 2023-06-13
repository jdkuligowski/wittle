from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import AgentSerializer
from .models import AgentSignup


class AgentListView(APIView):
    # permission_classes = (IsAuthenticated, )

    def post(self, request):
        
        waitlist_item = AgentSerializer(data=request.data)
        try:
            print('in the try')
            waitlist_item.is_valid()
            print(waitlist_item.is_valid())
            print(waitlist_item.errors)
            waitlist_item.save()
            return Response(waitlist_item.data, status.HTTP_201_CREATED)
        except ValidationError:
            print('validation error')
            return Response(waitlist_item.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print('exception error')
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)