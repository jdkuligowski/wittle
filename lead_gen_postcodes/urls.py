from django.urls import path
from .views import GetAllOutcodes

urlpatterns = [
    path('', GetAllOutcodes.as_view()),
]
