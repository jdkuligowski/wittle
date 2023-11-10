from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


from .models import SearchDetails
from .serializers.common import LeadGenDetailsSerialzer

class SearchDetailsCreateView(generics.CreateAPIView):
    queryset = SearchDetails.objects.all()
    serializer_class = LeadGenDetailsSerialzer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SearchDetailsUpdateView(generics.UpdateAPIView):
    queryset = SearchDetails.objects.all()
    serializer_class = LeadGenDetailsSerialzer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        owner_id = self.kwargs.get('owner_id')
        return get_object_or_404(SearchDetails, owner_id=owner_id)