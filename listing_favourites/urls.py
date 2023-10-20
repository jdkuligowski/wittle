from django.urls import path
from .views import FavouriteCreateView, FavouriteDetailView

urlpatterns = [
    path('', FavouriteCreateView.as_view()),
    path('<int:pk>/', FavouriteDetailView.as_view()),  # Endpoint to handle specific favourite by ID
]
