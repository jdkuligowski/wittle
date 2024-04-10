from django.urls import path
from .views import GetCampaignTrackingData

urlpatterns = [
    path('', GetCampaignTrackingData.as_view(), name='campaign_tracking'),
]