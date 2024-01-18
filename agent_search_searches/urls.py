from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import AddNewSearch, DeleteSearch, UpdateSearch

urlpatterns = [
    path('', AddNewSearch.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('delete/<int:id>/', DeleteSearch.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('update/<int:id>/', UpdateSearch.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
]