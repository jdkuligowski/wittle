from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import GetClient, GetMultipleClients, AddClient

urlpatterns = [
    path('', GetMultipleClients.as_view()), 
    path('<int:client_id>/', GetClient.as_view()), 
    path('add_client/', AddClient.as_view()), 
]