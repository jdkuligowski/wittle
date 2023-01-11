from django.urls import path
# views for our Comments
from .views import TubeListView

# default path for this conf file is: /comments/

urlpatterns = [
    path('', TubeListView.as_view()),
]