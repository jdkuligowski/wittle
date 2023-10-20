from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Favourite
from .serializers.common import ListingFavouriteSerializer

class FavouriteCreateView(generics.CreateAPIView):
    queryset = Favourite.objects.all()
    serializer_class = ListingFavouriteSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)




class FavouriteDetailView(generics.RetrieveDestroyAPIView):
    queryset = Favourite.objects.all()
    serializer_class = ListingFavouriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user)