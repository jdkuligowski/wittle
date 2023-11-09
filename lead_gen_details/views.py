from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import SearchDetails
from .serializers.common import LeadGenDetailsSerialzer

class SearchDetailsCreateView(generics.CreateAPIView):
    queryset = SearchDetails.objects.all()
    serializer_class = LeadGenDetailsSerialzer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

