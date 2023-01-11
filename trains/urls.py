from django.urls import path
# views for our Comments
from .views import TrainListView

# default path for this conf file is: /comments/

urlpatterns = [
    path('', TrainListView.as_view()),
]