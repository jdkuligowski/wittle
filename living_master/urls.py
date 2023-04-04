from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import CityListVew

urlpatterns = [
    path('', CityListVew.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
]