from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
import cloudinary.uploader
from rest_framework.exceptions import ValidationError


from .models import Signature
from .serializers.common import SignatureSerializers
import mimetypes
from rest_framework.exceptions import ValidationError

class SignatureView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        signatures = Signature.objects.all()
        serializer = SignatureSerializers(signatures, many=True)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        signature, created = Signature.objects.get_or_create(owner=user)

        # Handle file upload
        logo = request.FILES.get('logo')
        digital_signature = request.FILES.get('digital_signature')
        banner_image = request.FILES.get('banner_image')
        profile_image = request.FILES.get('profile_image')

        allowed_mime_types = ['image/jpeg', 'image/png']

        def validate_and_upload(file):
            if file:
                mime_type, _ = mimetypes.guess_type(file.name)
                if mime_type not in allowed_mime_types:
                    raise ValidationError({'detail': f'Invalid file type: {mime_type}. Only JPG, JPEG, and PNG files are allowed.'})
                upload_result = cloudinary.uploader.upload(file)
                return upload_result.get('url')
            return None

        try:
            if logo:
                signature.logo = validate_and_upload(logo)
            if digital_signature:
                signature.digital_signature = validate_and_upload(digital_signature)
            if banner_image:
                signature.banner_image = validate_and_upload(banner_image)
            if profile_image:
                signature.profile_image = validate_and_upload(profile_image)
        except cloudinary.exceptions.Error as e:
            if 'File size too large' in str(e):
                raise ValidationError({'detail': 'File size too large. It needs to be less than 10MB.'})
            else:
                raise ValidationError({'detail': str(e)})

        # Update other fields
        for field, value in request.data.items():
            if field not in ['logo', 'digital_signature', 'banner_image', 'profile_image', 'owner']:  # Exclude 'owner' from the fields being updated
                setattr(signature, field, value)

        signature.save()

        serializer = SignatureSerializers(signature)
        return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)
