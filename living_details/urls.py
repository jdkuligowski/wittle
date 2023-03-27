from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import LivingResultsView

urlpatterns = [
    path('', LivingResultsView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
]