from django.urls import path
# import view to use in register route
from .views import RegisterView, LoginView, UserDetailView, UserAdminView, GoogleSocialAuthView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('profile/<str:username>/', UserDetailView.as_view()),
    path('profile/xplw7aq5r/<str:username>/', UserAdminView.as_view()),
    path('google/', GoogleSocialAuthView.as_view()),

]
