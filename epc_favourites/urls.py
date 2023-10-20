from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import AddNewFavourite

urlpatterns = [
    path('', AddNewFavourite.as_view()), 
    path('favourites/<int:favourite_id>/', AddNewFavourite.as_view(), name='favourite-detail'),

]