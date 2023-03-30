from django.db import models

# Create your models here.
class Location(models.Model):
  postcode_district = models.CharField(default=None, max_length=4, null=True, blank=True)
  postcode_area = models.CharField(default=None, max_length=20, null=True, blank=True)
  overall_area = models.CharField(default=None, max_length=20, null=True, blank=True)
  lat = models.FloatField(default=None, null=True, blank=True)
  long = models.FloatField(default=None, null=True, blank=True)
  surrounding_areas = models.CharField(default=None, max_length=75, null=True, blank=True)
