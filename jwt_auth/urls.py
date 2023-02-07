from django.urls import path
from .views import RegisterView, LoginView, UserDetailView, UserAdminView # import view to use in register route

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<str:username>/', UserDetailView.as_view()),
    path('profile/xplw7aq5r/<str:username>/', UserAdminView.as_view())
]