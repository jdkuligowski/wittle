from django.urls import path
from .views import SearchDetailsCreateView, SearchDetailsUpdateView

urlpatterns = [
    path('', SearchDetailsCreateView.as_view()),
    path('<int:pk>/', SearchDetailsUpdateView.as_view()),
]
