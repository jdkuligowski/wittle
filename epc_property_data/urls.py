from django.urls import path
# views for our Comments
from .views import EPCPropertyPostcode, DataReadyWebhook, CombinedDataView

# default path for this conf file is: /comments/

urlpatterns = [
    path('<str:postcode>', EPCPropertyPostcode.as_view()),
    path('new-property-webhook/sales-data-ready/', DataReadyWebhook.as_view()),
    path('combined-epc-results/', CombinedDataView.as_view()),

    # path('new-property-webhook/rental-data-ready/', DataReadyWebhook.as_view()),
]