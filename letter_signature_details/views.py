from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
import cloudinary.uploader



from .models import Signature
from .serializers.common import SignatureSerializers

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
            if logo:
                upload_result = cloudinary.uploader.upload(logo)
                print(upload_result)
                logo_url = upload_result.get('url')
                signature.logo = logo_url

            # Update other fields
            for field, value in request.data.items():
                if field != 'logo' and field != 'owner':  # Exclude 'owner' from the fields being updated
                    setattr(signature, field, value)

            signature.save()

            serializer = SignatureSerializers(signature)
            return Response(serializer.data, status=status.HTTP_200_OK if not created else status.HTTP_201_CREATED)
