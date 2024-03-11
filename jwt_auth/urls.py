from django.urls import path
# import view to use in register route
from .views import RegisterView, LoginView, UserDetailView, UserAdminView, PasswordResetRequestView, PasswordResetView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<str:email>/', UserDetailView.as_view()),
    path('profile/xplw7aq5r/<str:email>/', UserAdminView.as_view()),
    path('password-reset-request/', PasswordResetRequestView.as_view()),
    path('password-reset/', PasswordResetView.as_view()),
]
