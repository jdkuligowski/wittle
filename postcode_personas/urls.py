from django.urls import path
from .views import combined_rental, combined_sales

urlpatterns = [
    path('rental/', combined_rental),
    path('sales/', combined_sales),
]
