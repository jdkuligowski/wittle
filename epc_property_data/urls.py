from django.urls import path
# views for our Comments
from .views import EPCPropertyPostcode

# default path for this conf file is: /comments/

urlpatterns = [
    path('<str:postcode>', EPCPropertyPostcode.as_view())
]