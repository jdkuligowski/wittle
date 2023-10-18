from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone


from .serializers.common import UsageSerializer
from .models import Usage


# View that allows us to add a new favourite property
class AddNewStatsView(APIView):
    permission_classes = (IsAuthenticated, )

    # GET - Returns all favourites
    def get(self, _request):
        user_stats = Usage.objects.all() 
        serialized_user_stats = UsageSerializer(user_stats, many=True)
        print('serialized data ->', serialized_user_stats.data)
        #  Response sends data and status back to the user as a response
        return Response(serialized_user_stats.data, status=status.HTTP_200_OK)


    def post(self, request):
        try:
            # Try fetching the existing usage record
            usage_record = Usage.objects.get(owner=request.user)
            print(request.user)
            # Check if the current month and year are different from the stored ones
            current_month = timezone.now().month
            current_year = timezone.now().year
            
            if usage_record.last_update_month != current_month or usage_record.last_update_year != current_year:
                usage_record.epc_monthly_count = 0
                usage_record.last_update_month = current_month 
                usage_record.last_update_year = current_year   
            
            # Increment the counts
            usage_record.epc_monthly_count += 1
            usage_record.epc_total_count += 1
            
            # Save the updated record back to the database
            usage_record.save()
            
            return Response({"status": "success", "message": "Usage count increased successfully"}, status=status.HTTP_200_OK)
        
        except Usage.DoesNotExist:
            return Response({"status": "error", "message": "Usage record does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# View that allows us to add a new favourite property
class AddNewListing(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        try:
            column_name = request.data.get('column')
            valid_columns = ['listing_normal_total', 'listing_ai_total', 'listing_insight_total']

            if column_name not in valid_columns:
                return Response({"status": "error", "message": "Invalid column name"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Try fetching the existing usage record
            usage_record = Usage.objects.get(owner=request.user)
            
            # Check if the current month and year are different from the stored ones
            current_month = timezone.now().month
            current_year = timezone.now().year
            
            if usage_record.last_update_month != current_month or usage_record.last_update_year != current_year:
                usage_record.listing_monthly_count = 0  # Reset the monthly count
                usage_record.last_update_month = current_month  # Update the last update month
                usage_record.last_update_year = current_year    # Update the last update year
            
            # Increment the specific column
            setattr(usage_record, column_name, getattr(usage_record, column_name) + 1)
            usage_record.listing_monthly_count += 1
            usage_record.listing_total_count += 1
            
            # Save the updated record back to the database
            usage_record.save()
            
            return Response({"status": "success", "message": f"{column_name} count increased successfully"}, status=status.HTTP_200_OK)
        
        except Usage.DoesNotExist:
            return Response({"status": "error", "message": "Usage record does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
