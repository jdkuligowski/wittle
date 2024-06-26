from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
#  NotFound is going to provide us with an exception that sends a 404 response to the end user
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import redirect

from rest_framework import serializers
from django.utils import timezone
from django.db import transaction
from django.core.mail import send_mail
from django.utils.html import format_html
import stripe
import environ

# create timestamps in different formats
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from django.conf import settings
import jwt
from rest_framework.exceptions import ValidationError
from account_details.models import Usage
from client_list.models import Company
import uuid

# Serializer
from .serializers.common import UserSerializer, UserRegistrationSerializer
from .serializers.populated import PopulatedUserSerializer
from .serializers.common import PasswordResetRequestSerializer, PasswordResetSerializer

from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse, HttpResponseRedirect


# Model
from django.contrib.auth import get_user_model
User = get_user_model()

env = environ.Env()

STRIPE_API_KEY = env('STRIPE_SECRET_KEY')
STRIPE_TEST_SECRET_KEY = env('STRIPE_TEST_SECRET_KEY')
STRIPE_SUBSCRIPTION_WEBHOOK = env('STRIPE_SUBSCRIPTION_WEBHOOK')


# utilities
from .utilities.user_emails import new_user_inbound

# class RegisterView(APIView):

#     def post(self, request):
#         stripe.api_key=STRIPE_API_KEY

#         with transaction.atomic():
#             serializer = UserRegistrationSerializer(data=request.data)
#             if serializer.is_valid():

#                 company_name = request.data.get('company_name', None)
#                 print('company_name ->', company_name)
#                 company = None
#                 if company_name:
#                     company, _ = Company.objects.get_or_create(name=company_name)
#                     print('company ->', company)
                
#                 # Creating the user without saving to DB yet
#                 user = User(**serializer.validated_data)
                
#                 # Hashing the user's password
#                 user.set_password(serializer.validated_data['password'])
                
#                 # assign company id to the user schema
#                 if company:
#                     user.company = company
#                 user.save() 
                                
#                 # Stripe Customer Creation
#                 stripe_customer = stripe.Customer.create(email=user.email)
#                 print("Stripe customer created with ID:", stripe_customer.id)
                
#                 # Create and link the Usage instance with Stripe customer ID
#                 Usage.objects.create(owner=user, stripe_customer_id=stripe_customer.id)

#                 print(serializer)

#                 # Use serializer.validated_data to get user details
#                 email = serializer.validated_data.get('email', 'No email provided')
#                 first_name = serializer.validated_data.get('first_name', 'No first name provided')
#                 last_name = serializer.validated_data.get('last_name', 'No last name provided')
#                 company_name = company.name if company else 'No company provided'
                
#                 new_user_inbound(email, first_name, last_name, company_name) 

#                 return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
#             else:
#                 # Handling invalid data
#                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(APIView):
    def post(self, request):
        stripe.api_key = STRIPE_API_KEY
        tier_name = request.data.get('tier')  # Always expected in the request
        price_id = settings.STRIPE_PRICE_IDS.get(tier_name) if tier_name != 'Free' else None

        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            if price_id:
                # Pre-create a Stripe customer for paid subscriptions
                stripe_customer = stripe.Customer.create(email=request.data.get('email'))
                user_data_json = json.dumps(request.data)

                try:
                    checkout_session = stripe.checkout.Session.create(
                        payment_method_types=['card'],
                        customer=stripe_customer.id,
                        line_items=[{'price': price_id, 'quantity': 1}],
                        mode='subscription',
                        cancel_url='https://www.wittle.co/register',
                        success_url = f'https://www.wittle.co/login?success=true',
                        metadata={'tier_name': tier_name, 'user_data': user_data_json}
                    )
                    return Response({
                        'message': 'Redirect to Stripe to complete payment.',
                        'checkout_session_id': checkout_session.id,
                        'checkout_url': checkout_session.url,
                    }, status=status.HTTP_200_OK)  # Changed to 200 OK
                except Exception as e:
                    return Response({
                        'message': 'Failed to create Stripe checkout session.',
                        'error': str(e)
                    }, status=status.HTTP_400_BAD_REQUEST)

            else:
                # Free registration handling
                with transaction.atomic():
                    user = serializer.save()
                    user.set_password(serializer.validated_data['password'])
                    user.save()

                    company_name = request.data.get('company_name', None)
                    if company_name:
                        company, _ = Company.objects.get_or_create(name=company_name)
                        user.company = company
                        user.company_name = company_name

                    stripe_customer = stripe.Customer.create(email=user.email)
                    current_date = datetime.now()
                    Usage.objects.create(
                        owner=user, 
                        stripe_customer_id=stripe_customer.id, 
                        package='Unlimited',
                        date_reset=current_date,
                        days_left=30  # Or calculate days based on the exact reset logic
                    )
                    # Use serializer.validated_data to get user details
                    email = serializer.validated_data.get('email', 'No email provided')
                    first_name = serializer.validated_data.get('first_name', 'No first name provided')
                    last_name = serializer.validated_data.get('last_name', 'No last name provided')
                    company_name = company.name if company else 'No company provided'
                    new_user_inbound(email, first_name, last_name, company_name) 

                    return Response({'message': 'Free registration successful'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_exempt, name='dispatch')
class StripeWebhookView(APIView):
    def post(self, request):
        payload = request.body
        sig_header = request.headers.get('Stripe-Signature')
        stripe.api_key = STRIPE_API_KEY

        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, STRIPE_SUBSCRIPTION_WEBHOOK
            )

            if event['type'] == 'checkout.session.completed':
                session = event['data']['object']
                user_data_json = session['metadata']['user_data']
                user_data = json.loads(user_data_json)  # Deserialize the user data
                tier_name = session['metadata']['tier_name']
                # Possibly store this token temporarily in a secure manner
          
                with transaction.atomic():
                    serializer = UserRegistrationSerializer(data=user_data)
                    if serializer.is_valid():
                        user = serializer.save()
                        user.set_password(serializer.validated_data['password'])
                        user.save()

                        company_name = user_data.get('company_name')
                        if company_name:
                            company, _ = Company.objects.get_or_create(name=company_name)
                            user.company = company
                            user.company_name = company_name

                        
                        Usage.objects.create(
                            owner=user, 
                            stripe_customer_id=session['customer'], 
                            package=tier_name
                        )

                        # Use serializer.validated_data to get user details
                        email = serializer.validated_data.get('email', 'No email provided')
                        first_name = serializer.validated_data.get('first_name', 'No first name provided')
                        last_name = serializer.validated_data.get('last_name', 'No last name provided')
                        company_name = company.name if company else 'No company provided'
                        new_user_inbound(email, first_name, last_name, company_name) 

                        return JsonResponse({'status': 'success', 'message': 'Session completed and token stored.'})

                    else:
                        return JsonResponse({'status': 'error', 'message': 'Invalid user data'}, status=400)
        except ValueError as e:
            return JsonResponse({'status': 'error', 'message': 'Invalid payload'}, status=400)
        except stripe.error.SignatureVerificationError as e:
            return JsonResponse({'status': 'error', 'message': 'Invalid signature'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)



# Helper Functions
def calculate_days_left(date_reset):
    current_date = datetime.now().date()
    delta_days = (date_reset - current_date).days
    return delta_days

def get_next_reset_date(date_reset):
    current_date = datetime.now().date()

    if current_date >= date_reset:
        # Move to the same day next month
        next_reset_date = date_reset + relativedelta(months=1)
    else:
        # Reset date is still in the future within this month
        next_reset_date = date_reset

    return next_reset_date



# Login View
class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_validate = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied('Invalid credentials')

        if not user_to_validate.check_password(password):
            raise PermissionDenied('Invalid credentials')

        try:
            usage_record = Usage.objects.get(owner=user_to_validate)
            current_date = datetime.now().date()
            print("Current Date:", current_date)

            if usage_record.date_reset:
                # Calculate the number of days left based on the current reset date
                days_left = calculate_days_left(usage_record.date_reset)
                print("Days Left Before Update:", days_left)

                # Check if the reset date is in the past
                if days_left < 0:
                    print("Resetting monthly counts as the reset date is in the past...")
                    # Reset monthly counts
                    usage_record.epc_monthly_count = 0
                    usage_record.listing_monthly_count = 0
                    usage_record.valuation_monthly_count = 0
                    usage_record.save_lead_gen_month_total = 0

                    # Update date_reset to the same day in the next month
                    usage_record.date_reset = get_next_reset_date(usage_record.date_reset)
                    print("Updated Date Reset:", usage_record.date_reset)

                    # Recalculate the days left after resetting
                    days_left = calculate_days_left(usage_record.date_reset)
                    print("Days Left After Update:", days_left)

                # Update days left
                usage_record.days_left = days_left

            # Update last login
            usage_record.last_login = current_date
            usage_record.save()
            print("Usage Record Saved")

        except Usage.DoesNotExist:
            # Create a new Usage record if none exists
            Usage.objects.create(
                owner=user_to_validate,
                last_login=current_date,
                date_reset=current_date,  # Set to now, assuming it's a new user
                days_left=30  # Assuming a new user gets 30 days; adjust as needed
            )
            print("New Usage Record Created")

        # Create a JWT token
        dt = datetime.now() + timedelta(hours=12)
        token = jwt.encode(
            {
                'sub': user_to_validate.id,
                'exp': int(dt.strftime('%s'))
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'message': f"Welcome back, {user_to_validate.email}", 'token': token, 'email': user_to_validate.email}, status.HTTP_202_ACCEPTED)


# ENDPOINT: /users/:pk/
# @method_decorator(cache_page(60 * 60), name='dispatch')
class UserDetailView(APIView):
    permission_classes = (IsAuthenticated, )
    # CUSTOM FUNCTION
    # Purpose of this function is to attempt the find a specific property returning that property, and throwing a 404 if failed

    def get_user(self, email):
        try:
            # pk= is us detailing that we want to look in whatever column is the PRIMARY KEY column
            # the second pk is the captured value
            # this is the same as saying in SQL: WHERE id = 1
            return User.objects.get(email=email)
        except User.DoesNotExist as e:
            print(e)
            raise NotFound({'detail': str(e)})

    # GET - Return 1 item from the user table
    def get(self, _request, email):
        user = self.get_user(email)
        print('user --->', user)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status.HTTP_200_OK)



# ENDPOINT: /wittle-results/xplw7aq5r/:username/
class UserAdminView(APIView):
    # CUSTOM FUNCTION
    def get_user(self, email):
        try:

            return User.objects.get(email=email)
        except User.DoesNotExist as e:
            print(e)
            raise NotFound({'detail': str(e)})

    # GET - Return 1 item from the user table
    def get(self, _request, email):
        user = self.get_user(email)
        print('user --->', user)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status.HTTP_200_OK)


# Password reset request
class PasswordResetRequestView(APIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        # print(email)

        try:
            user = User.objects.get(email=email)
            print('user exists')
        except User.DoesNotExist:
            print('no user')
            # Do not inform the user if the account does not exist,
            # to prevent email enumeration
            return Response({'detail': 'If the email is valid, we have sent you a password reset link.'})


        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        mail_subject = 'Reset password: Wittle'
        message = render_to_string('password_reset_email.html', {
            'user': user,
            'domain': 'wittle-test.azurewebsites.net',
            'uid': uid,
            'token': token,
        })
        # print(message)
        new_email = EmailMultiAlternatives(mail_subject, message, to=[email])
        try:
          new_email.send()
          print(new_email.send())
          return Response({'detail': 'If the email is valid, we have sent you a password reset link.'}, status.HTTP_200_OK)
        except Exception as e:
          print(str(e))




# Password reset view
class PasswordResetView(APIView):
    serializer_class = PasswordResetSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        print(serializer)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
          print('valid')
        else:
          print(serializer.errors) 

        uid = force_str(urlsafe_base64_decode(serializer.validated_data['uid']))
        token = serializer.validated_data['token']
        password = serializer.validated_data['password']
        try:
            user = User.objects.get(pk=uid)
        except User.DoesNotExist:
            raise serializers.ValidationError({'uid': ['Invalid UID.']})

        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError({'token': ['Invalid or expired token.']})

        user.set_password(password)
        user.save()

        return Response({'detail': 'Password has been reset.'})