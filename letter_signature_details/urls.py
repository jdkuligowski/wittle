from django.urls import path
from .views import SignatureView

urlpatterns = [
    path('', SignatureView.as_view()),
]
