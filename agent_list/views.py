from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Branches
from .serializers.common import BranchSerializer
from django.db import IntegrityError
from rest_framework import status
from django.core.exceptions import ValidationError




class GetBranches(APIView):

    def get(self, _request):
        branch_data = Branches.objects.all() 
        serialized_branch_data = BranchSerializer(branch_data, many=True)
        # print('serialized data ->', serialized_branch_data.data)
        #  Response sends data and status back to the user as a response
        return Response(serialized_branch_data.data, status=status.HTTP_200_OK)