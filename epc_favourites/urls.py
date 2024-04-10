from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import AddNewFavourite, UpdateFavorites, DeleteFavourites, RemoveProperty, EditSingleFavourite, DeleteMultipleFavourites, ArchivedToSaved, MoveToLetters, TestSendLetter, AddToFavoritesCampaign, RemovePropertiesFromCampaign

urlpatterns = [
    path('', AddNewFavourite.as_view()), 
    # path('favourites/<int:favourite_id>/', AddNewFavourite.as_view(), name='favourite-detail'),
    path('update_favourites/', UpdateFavorites.as_view()),
    path('update_favourites/archive-to-saved/', ArchivedToSaved.as_view()),
    # path('update_favourites/status_check/', UpdateFavoritePropertiesStatus.as_view()),
    path('remove_property/', RemoveProperty.as_view()),
    path('delete_favourite/', DeleteFavourites.as_view()),
    path('delete_favourite/multiple/', DeleteMultipleFavourites.as_view()),
    path('update_favourites/<int:rightmove_id>/', EditSingleFavourite.as_view()),
    path('move_to_letters/', MoveToLetters.as_view()),
    path('test_letter/', TestSendLetter.as_view()),
    path('add_to_campaign/', AddToFavoritesCampaign.as_view()),
    path('remove_from_campaign/', RemovePropertiesFromCampaign.as_view()),


]