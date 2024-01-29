from django.urls import path
from .views import combined_rental, combined_sales, sales_properties_near_school

urlpatterns = [
    path('rental/', combined_rental),
    path('sales/', combined_sales),
    path('sales/primaries/', sales_properties_near_school),
]
