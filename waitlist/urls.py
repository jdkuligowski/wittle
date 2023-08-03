from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import WaitlistView, CheckEmailView, UnsubscribeView

urlpatterns = [
    path('', WaitlistView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('check-email/', CheckEmailView.as_view()),
    path('unsubscribe/', UnsubscribeView.as_view()),
]
