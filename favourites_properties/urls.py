from django.urls import path
# views for our Comments
from .views import FavouriteListView, FavouriteDetailView

# default path for this conf file is: /comments/

urlpatterns = [
    path('', FavouriteListView.as_view()),
    path('<int:property>/', FavouriteDetailView.as_view())
]