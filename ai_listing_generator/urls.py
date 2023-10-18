from django.urls import path
from . import views

urlpatterns = [
    path('generate_text/', views.generate_property_listing, name='generate_property_listing')
]