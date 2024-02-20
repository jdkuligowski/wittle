from django.db import models

# Create your models here.
class Property(models.Model):
  url = models.CharField(default=None, max_length=400, null=True, blank=True)
  address = models.CharField(default=None, max_length=200, null=True, blank=True)
  bathrooms = models.FloatField(default=None, null=True, blank=True)
  bedrooms = models.FloatField(default=None, null=True, blank=True)
  agent = models.CharField(default=None, max_length=100, null=True, blank=True)
  propertyType = models.CharField(default=None, max_length=50, null=True, blank=True)
  tenure = models.CharField(default=None, max_length=30, null=True, blank=True)
  size = models.CharField(default=None, max_length=30, null=True, blank=True)
  longitude = models.FloatField(default=None, null=True, blank=True)
  latitude = models.FloatField(default=None, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  incode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  outcode = models.CharField(default=None, max_length=10, null=True, blank=True)
  subcode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  uprn = models.FloatField(default=None, null=True, blank=True)





