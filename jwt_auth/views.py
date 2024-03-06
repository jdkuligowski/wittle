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

from rest_framework import serializers
from django.utils import timezone
from django.db import transaction
from django.core.mail import send_mail
from django.utils.html import format_html

# create timestamps in different formats
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from rest_framework.exceptions import ValidationError
from account_details.models import Usage
from client_list.models import Company

# Serializer
from .serializers.common import UserSerializer, UserRegistrationSerializer
from .serializers.populated import PopulatedUserSerializer
from .serializers.common import PasswordResetRequestSerializer, PasswordResetSerializer

# Model
from django.contrib.auth import get_user_model
User = get_user_model()

# utilities
from .utilities.user_emails import new_user_inbound, new_user_welcome

class RegisterView(APIView):

    def post(self, request):
        with transaction.atomic():
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():

                company_name = request.data.get('company_name', None)
                print('company_name ->', company_name)
                company = None
                if company_name:
                    company, _ = Company.objects.get_or_create(name=company_name)
                    print('company ->', company)
                
                # Creating the user without saving to DB yet
                user = User(**serializer.validated_data)
                
                # Hashing the user's password
                user.set_password(serializer.validated_data['password'])
                
                # assign company id to the user schema
                if company:
                    user.company = company
                user.save() 
                                
                # Create and link the Usage instance
                Usage.objects.create(owner=user)
                print(serializer)

                # Use serializer.validated_data to get user details
                email = serializer.validated_data.get('email', 'No email provided')
                first_name = serializer.validated_data.get('first_name', 'No first name provided')
                last_name = serializer.validated_data.get('last_name', 'No last name provided')
                company_name = company.name if company else 'No company provided'
                
                new_user_inbound(email, first_name, last_name, company_name) 
                new_user_welcome(email, first_name, last_name, company_name) 


                return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
            else:
                # Handling invalid data
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            # similar to pk=pk, here we search for a user by the email field on the model
            # we use the request email as the value, which will return a user record if one exists
            user_to_validate = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied('Invalid credentials')

        # if we get to here, then a user was found in the db matching the email passed
        # we need to check the plain text password against the stored hashed password and we'll use check_password to do it
        if not user_to_validate.check_password(password):
            raise PermissionDenied('Invalid credentials')

        # User is authenticated at this point
        # Update the last_login for the Usage record
        try:
            usage_record = Usage.objects.get(owner=user_to_validate)
            usage_record.last_login = timezone.now()
            usage_record.save()
        except Usage.DoesNotExist:
            # Handle the case where there is no Usage record for the user
            # You can create a new Usage record here if appropriate
            pass
        # datetime.now() gives us the timestamp for right now
        # we then add on 12 hours by using timedelta and specifying hours=3
        dt = datetime.now() + timedelta(hours=12)

        # building our token
        token = jwt.encode(
            {
                'sub': user_to_validate.id,
                'exp': int(dt.strftime('%s'))
            },
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'message': f"Welcome back, {user_to_validate.username}", 'token': token, 'username': {user_to_validate.username}}, status.HTTP_202_ACCEPTED)


# ENDPOINT: /users/:pk/
# @method_decorator(cache_page(60 * 60), name='dispatch')
class UserDetailView(APIView):
    permission_classes = (IsAuthenticated, )
    # CUSTOM FUNCTION
    # Purpose of this function is to attempt the find a specific property returning that property, and throwing a 404 if failed

    def get_user(self, username):
        try:
            # pk= is us detailing that we want to look in whatever column is the PRIMARY KEY column
            # the second pk is the captured value
            # this is the same as saying in SQL: WHERE id = 1
            return User.objects.get(username=username)
        except User.DoesNotExist as e:
            print(e)
            raise NotFound({'detail': str(e)})

    # GET - Return 1 item from the user table
    def get(self, _request, username):
        user = self.get_user(username)
        print('user --->', user)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status.HTTP_200_OK)



# ENDPOINT: /wittle-results/xplw7aq5r/:username/
class UserAdminView(APIView):
    # CUSTOM FUNCTION
    def get_user(self, username):
        try:

            return User.objects.get(username=username)
        except User.DoesNotExist as e:
            print(e)
            raise NotFound({'detail': str(e)})

    # GET - Return 1 item from the user table
    def get(self, _request, username):
        user = self.get_user(username)
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