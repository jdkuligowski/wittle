# Add this to your urls.py
from django.urls import path
from .views import PropertyDescriptionSearchView

urlpatterns = [
    path('test1a/search_property_description/', PropertyDescriptionSearchView.as_view(), name='search_property_description')
]