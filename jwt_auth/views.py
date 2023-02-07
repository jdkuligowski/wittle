from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
#  NotFound is going to provide us with an exception that sends a 404 response to the end user
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

# create timestamps in different formats
from datetime import datetime, timedelta
from django.conf import settings
import jwt
from rest_framework.exceptions import ValidationError

# Serializer
from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer

# Model
from django.contrib.auth import get_user_model
User = get_user_model()


class RegisterView(APIView):

    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        print('user data ->', user_to_add)
        print('hit the register route')
        try:
            print('trying')
            user_to_add.is_valid()
            print(user_to_add.is_valid())

            print('adding user')
            # print(user_to_add.errors)
            user_to_add.save()
            return Response({'message': 'Registration Successful'}, status.HTTP_202_ACCEPTED)
        except ValidationError:
            print('registration - validation error')
            return Response(user_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(user_to_add.is_valid())
            print('errors ->', user_to_add.errors)
            print('registration - exception error')
            print(e)
            return Response({'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)
            # return Response({'detail': str(e)}, user_to_add.errors)


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

        # If we get here, then the user is verified
        # at this point, we want to create a token

        # datetime.now() gives us the timestamp for right now
        # we then add on 3 hours by using timedelta and specifying hours=3
        dt = datetime.now() + timedelta(hours=3)

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
