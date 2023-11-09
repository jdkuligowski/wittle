from django.urls import path
from .views import SearchDetailsCreateView

urlpatterns = [
    path('', SearchDetailsCreateView.as_view()),
]
