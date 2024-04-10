from django.urls import path # path allows us to set the url pattern with an endpoint and a view
from .views import AddNewStatsView, AddNewListing, GeneralUsageView, stripe_webhook, AddCredit

urlpatterns = [
    path('', AddNewStatsView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('listing/', AddNewListing.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('overall/', GeneralUsageView.as_view()), # as_view passes the httprequest onto the request attribute on the view/controller
    path('stripe/payment_webhook/', stripe_webhook, name='stripe_webhook'),
    path('add_credit/', AddCredit.as_view())
]