from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
import stripe
import environ
from .serializers.common import UsageSerializer
from .models import Usage
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth import get_user_model
from decimal import Decimal
import logging
import time
import hmac
import hashlib

User = get_user_model()

env = environ.Env()
STRIPE_API_KEY = env('STRIPE_SECRET_KEY')
STRIPE_WEBHOOK_SECRET = env('STRIPE_WEBHOOK_SECRET')

logger = logging.getLogger(__name__)


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
            valid_columns = ['listing_normal_total',
                             'listing_ai_total', 'listing_insight_total']

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
            setattr(usage_record, column_name, getattr(
                usage_record, column_name) + 1)
            usage_record.listing_monthly_count += 1
            usage_record.listing_total_count += 1

            # Save the updated record back to the database
            usage_record.save()

            return Response({"status": "success", "message": f"{column_name} count increased successfully"}, status=status.HTTP_200_OK)

        except Usage.DoesNotExist:
            return Response({"status": "error", "message": "Usage record does not exist"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GeneralUsageView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        try:
            # Fetch the existing usage record for the user
            usage_record = Usage.objects.get(owner=request.user)

            # Increment the total logins count
            if usage_record.total_logins is None:
                usage_record.total_logins = 1
            else:
                usage_record.total_logins += 1

            # Update the last login date
            usage_record.last_login = timezone.now()

            # Save the updated record back to the database
            usage_record.save()

            return Response({"status": "success", "message": "Login count increased successfully"}, status=status.HTTP_200_OK)

        except Usage.DoesNotExist:
            return Response({"status": "error", "message": "Usage record does not exist"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"status": "error", "message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





class AddCredit(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        stripe.api_key=STRIPE_API_KEY
        user = request.user
        credits_amount = request.data.get("credits_amount")
        usage_stats = user.usage_stats.first()  # Get the first instance from the related manager

        if not usage_stats:  # If usage_stats doesn't exist, create a new one
            usage_stats = Usage.objects.create(owner=user)

        stripe_customer_id = usage_stats.stripe_customer_id

        if not stripe_customer_id:
            stripe_customer = stripe.Customer.create(email=user.email)
            usage_stats.stripe_customer_id = stripe_customer.id
            usage_stats.save()  # Save the changes to the usage_stats instance
            stripe_customer_id = stripe_customer.id

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            customer=stripe_customer_id,
            line_items=[{
                'price_data': {
                    'currency': 'gbp',
                    'product_data': {
                        'name': 'Credits',
                    },
                    'unit_amount': int(credits_amount * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=request.build_absolute_uri(
                'http://localhost:3000/agents/lead-gen') + '?success=true',
            cancel_url=request.build_absolute_uri(
                'http://localhost:3000/agents/lead-gen') + '?canceled=true',
            # Adding credits amount to metadata for reference
            metadata={'credits_amount': credits_amount}
        )
        logger.info("Completed add credit")

        return Response({'sessionId': checkout_session.id})




@csrf_exempt
@require_POST
def stripe_webhook(request):

    logger.info(f"Webhook received at {request.get_full_path()}")
    logger.info(f"Raw payload: {request.body}")
    logger.info(f"Raw headers: {request.META}")


    start_time = time.time()  # Start time for performance logging
    logger.info("Received Stripe webhook call")
    
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    logger.info(f"Signature header {sig_header}")
    logger.info(f"Secret input {STRIPE_WEBHOOK_SECRET}")


    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
        logger.debug(f"Webhook event {event['id']} received, type: {event['type']}")
    except ValueError as e:
        logger.exception("Invalid payload")
        return JsonResponse({'status': 'error', 'message': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError as e:
        logger.exception("Invalid signature")
        return JsonResponse({'status': 'error', 'message': 'Invalid signature'}, status=400)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        try:
            customer_id = session['customer']
            user = User.objects.get(usage_stats__stripe_customer_id=customer_id)
            credits_amount = calculate_credits_amount_from_session(session)
            add_credits_to_user(user, credits_amount)
            logger.info(f"Successfully updated credits for user {user.username} (ID: {user.id}).")
            elapsed_time = time.time() - start_time  # Calculate elapsed time
            logger.info(f"Processed webhook event {event['id']} in {elapsed_time:.2f} seconds.")
            return JsonResponse({'status': 'success', 'message': 'Credits updated'})
        except User.DoesNotExist:
            logger.error(f"User with stripe_customer_id {customer_id} does not exist.")
            return JsonResponse({'status': 'error', 'message': 'User not found'}, status=404)
        except Exception:
            logger.exception("Unexpected error updating user credits")
            return JsonResponse({'status': 'error', 'message': 'Failed to update credits'}, status=500)

    logger.warning(f"Received unhandled event type: {event['type']}")
    return JsonResponse({'status': 'error', 'message': 'Unhandled event type'}, status=400)


def calculate_credits_amount_from_session(session):
    credits_amount_str = session.get('metadata', {}).get('credits_amount', '0')
    return Decimal(credits_amount_str)


def add_credits_to_user(user, credits):
    usage_instance = user.usage_stats.first()
    if usage_instance:
        usage_instance.credits += credits
        usage_instance.save()
        logger.info(f"Credits updated for user {user.username} (ID: {user.id}). New balance: {usage_instance.credits}")

