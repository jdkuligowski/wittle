from django.urls import path
# views for our Comments
from .views import PostcodeSingleView

# default path for this conf file is: /comments/

urlpatterns = [
    path('<str:postcode>', PostcodeSingleView.as_view())
]