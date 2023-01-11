from django.db import models

# Create your models here.
class Tube(models.Model):
  # Section 1: core property data 
  station_name = models.CharField(default=None, max_length=250, null=True, blank=True)
  line = models.CharField(default=None, max_length=250, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
  postcode_area = models.CharField(default=None, max_length=6, null=True, blank=True)
  long = models.FloatField(default=None, null=True, blank=True)
  lat = models.FloatField(default=None, null=True, blank=True)