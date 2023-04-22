from django.db import models

# Create your models here.
class List(models.Model):
  email_address = models.CharField(default=None, max_length=150, null=True, blank=True, unique=True)
  long = models.FloatField(default=None, null=True, blank=True)
  lat = models.FloatField(default=None, null=True, blank=True)
  email_confirmation = models.SmallIntegerField(default=None, null=True, blank=True)

