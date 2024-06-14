# models.py
from django.db import models

class UserZapierConnection(models.Model):
    access_token = models.CharField(max_length=255)
    refresh_token = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='zapier_credentials',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )
