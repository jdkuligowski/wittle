from django.urls import path
# views for our Comments
from .views import LocationsListView

# default path for this conf file is: /comments/

urlpatterns = [
    path('', LocationsListView.as_view()),
]