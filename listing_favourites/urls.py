from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import FavouriteCreateView

urlpatterns = [
    path('', FavouriteCreateView.as_view()), 
]