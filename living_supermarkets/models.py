from django.db import models

# Create your models here.

class Supermarket(models.Model):
      supermarket_name = models.CharField(default=None, max_length=150, null=True, blank=True)
      Lat = models.FloatField(default=None, null=True, blank=True)
      long = models.FloatField(default=None, null=True, blank=True)
      cleansed_name = models.CharField(default=None, max_length=50, null=True, blank=True)
      size = models.CharField(default=None, max_length=30, null=True, blank=True)
      segment = models.CharField(default=None, max_length=40, null=True, blank=True)
      postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
      postcode_area = models.CharField(default=None, max_length=5, null=True, blank=True)

