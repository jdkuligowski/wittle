from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import PropertySearchListView, PropertySearchDetailView, PropertyAdminSearchListView, PropertyAdminSearchDetailView



urlpatterns = [
    path('', PropertySearchListView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('<int:pk>', PropertySearchDetailView.as_view()),
    path('xplw7aq5r', PropertyAdminSearchListView.as_view()),
    path('xplw7aq5r/<int:pk>', PropertyAdminSearchDetailView.as_view())
]