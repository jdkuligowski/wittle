from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import AddNewFavourite, DeleteFavourites, GetFavourites

urlpatterns = [
    path('get/', GetFavourites.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('post/', AddNewFavourite.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('delete/', DeleteFavourites.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
]