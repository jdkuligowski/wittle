from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Tracker
from .serializers.common import TrackerSerializer

class GetCampaignTrackingData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        campaign_name = request.query_params.get('campaign_name')
        if not campaign_name:
            return Response({'error': 'Campaign name parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = request.user
        tracking_details = Tracker.objects.filter(campaign_name=campaign_name, owner=user)
        
        if not tracking_details.exists():
            return Response({'message': 'No tracking details found for the specified campaign and user.'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TrackerSerializer(tracking_details, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
