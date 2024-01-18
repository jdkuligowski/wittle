from django.db import models

class ClientDetails(models.Model):
  first_name = models.CharField(default=None, max_length=30, null=True, blank=True)
  last_name = models.CharField(default=None, max_length=30, null=True, blank=True)
  area = models.CharField(default=None, max_length=50, null=True, blank=True)
  looking = models.CharField(default=None, max_length=50, null=True, blank=True)
  date_onboarded = models.DateField(null=True, blank=True, auto_now_add=True)
  link_sent = models.CharField(default=None, max_length=10, null=True, blank=True)
  link_replied = models.CharField(default=None, max_length=10, null=True, blank=True)
  email = models.CharField(default=None, max_length=60, null=True, blank=True, unique=True)
  owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='client_details',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
  )

