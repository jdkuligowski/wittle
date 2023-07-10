from django.db import models
from white_greenspace_lsoa.models import ParksLsoa

# Create your models here.
class Postcodes(models.Model):
  postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
  longitude = models.FloatField(default=None)
  latitude = models.FloatField(default=None)
  easting = models.IntegerField(default=None)
  northing = models.IntegerField(default=None)
  district = models.CharField(default=None, max_length=30, null=True, blank=True)
  ward = models.CharField(default=None, max_length=60, null=True, blank=True)
  lsoa = models.CharField(default=None, max_length=40, null=True, blank=True)
  avg_income = models.IntegerField(default=None, null=True, blank=True)
  
  
  @property
  def parks_lsoa(self):
    return ParksLsoa.objects.filter(lsoa_code=self.lsoa)