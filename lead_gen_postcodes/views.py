from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Outcodes
from .serializers.common import OutcodeSerializer


class GetAllOutcodes(APIView):
    def get(self, request):
        outcodes = Outcodes.objects.all()
        serializer = OutcodeSerializer(outcodes, many=True)
        return Response(serializer.data)