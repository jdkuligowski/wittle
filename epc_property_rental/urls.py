from django.urls import path
# views for our Comments
from .views import RentalProperties, DataReadyWebhook, combined_data

# default path for this conf file is: /comments/

urlpatterns = [
    path('<str:postcode>', RentalProperties.as_view()),
    path('new-property-webhook/rental-data-ready/', DataReadyWebhook.as_view()),
    # path('combined-epc-results/', CombinedDataView.as_view()),
    path('combined-epc-results/', combined_data),

]