from django.urls import path
from .views import SearchDetailsCreateView, SearchDetailsUpdateView

urlpatterns = [
    path('', SearchDetailsCreateView.as_view()),
    path('<int:owner_id>/', SearchDetailsUpdateView.as_view()),
]
