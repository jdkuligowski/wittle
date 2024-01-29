from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import AddNewFavourite, UpdateFavorites, DeleteFavourites, RemoveProperty, EditSingleFavourite

urlpatterns = [
    path('', AddNewFavourite.as_view()), 
    # path('favourites/<int:favourite_id>/', AddNewFavourite.as_view(), name='favourite-detail'),
    path('update_favourites/', UpdateFavorites.as_view()),
    path('remove_property/', RemoveProperty.as_view()),
    path('delete_favourite/', DeleteFavourites.as_view()),
    path('update_favourites/<int:rightmove_id>/', EditSingleFavourite.as_view()),
]