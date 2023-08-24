from django.db import models


# Create your models here.
class EvList(models.Model):
  location = models.CharField(default=None, max_length=100, null=True, blank=True)
  power = models.FloatField(default=None, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=20, null=True, blank=True)
  town = models.CharField(default=None, max_length=100, null=True, blank=True)
  borough = models.CharField(default=None, max_length=100, null=True, blank=True)
  enabled = models.CharField(default=None, max_length=5, null=True, blank=True)
  latitude = models.FloatField(default=None, null=True, blank=True)
  longitude = models.FloatField(default=None, null=True, blank=True)
  fast_charging = models.CharField(default=None, max_length=5, null=True, blank=True)


