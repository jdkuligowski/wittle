from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError # this error will be thrown if our password doesn't match our password_confirmation
# from library.sociallib import goog
# from library.register.register import register_social_user
from rest_framework.exceptions import AuthenticationFailed


# User model
User = get_user_model()

# inherit model serializer
class UserSerializer(serializers.ModelSerializer):
    # we're gonna define password and password_confirmation fields as write_only
    password = serializers.CharField(write_only=True) # write_only=True ensures these are never returned when converting to JSON
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        # check our passwords match (password vs password_confirmation)
        # hash our password
        # readd the hashed password to the data to be added to the db

        # remove password and password_confirmation from the data dict
        # we'll use pop method to save these to variables for use later
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        # check if password matches password_confirmation
        if password != password_confirmation:
            raise ValidationError({
                'password_confirmation': 'Does not match password'
            })

        # This part is optional, it can be left off if we don't want secure password
        # Validate the password by the default validation conditions set by Django
        try:
            password_validation.validate_password(password)
        except ValidationError as e:
            print(e)
            raise ValidationError({
                'password': e.messages
            })

        # If we get to this point, then password validation passed
        # now we need to hash the password
        data['password'] = make_password(password)
        print(data)
        return data

    class Meta:
        model = User
        fields = '__all__'
        # fields = ('id', 'email', 'username', 'first_name', 'last_name', 'age', 'permissions', 'profile_image', 'password', 'password_confirmation')


# class GoogleSocialAuthSerializer(serializers.Serializer):
#     auth_token = serializers.CharField()

#     def validate_auth_token(self, auth_token):
#         user_data = goog.Google.validate(auth_token)
#         try:
#             user_data['sub']
#         except:
#             raise serializers.ValidationError(
#                 'The token is invalid or expired. Please login again.'
#             )
#         print(user_data['aud'])
#         if user_data['aud'] != settings.GOOGLE_CLIENT_ID:

#             raise AuthenticationFailed('oops, who are you?')

#         user_id = user_data['sub']
#         email = user_data['email']
#         name = user_data['name']
#         provider = 'google'

#         return register_social_user(
#             provider=provider, user_id=user_id, email=email, name=name)