from django.urls import path
from .views import GetAllCampaigns, GetSingleCampaign, CreateCampaign, EditCampaign, DeleteCampaign, CampaignProcessingView, GetScheduledResponseWebhook, DuplicateCampaignView
# , CancelScheduledLetterView

urlpatterns = [
    path('', GetAllCampaigns.as_view()),
    path('<int:campaign_id>/', GetSingleCampaign.as_view()),
    path('add/', CreateCampaign.as_view()),
    path('edit/<int:pk>/', EditCampaign.as_view()),
    path('delete/<int:campaign_id>/', DeleteCampaign.as_view()),
    path('create_campaign/', CampaignProcessingView.as_view()),
    path('duplicate/<int:pk>/', DuplicateCampaignView.as_view()),
    path('letter_webhook_response/', GetScheduledResponseWebhook.as_view()),
    # path('cancel_scheduled_letter/<int:tracker_id>/', CancelScheduledLetterView.as_view()),
]
