from django.db import models

# Create your models here.
class Gym(models.Model):
  gym_id = models.SmallIntegerField(default=None, null=True, blank=True)
  gym_name = models.CharField(default=None, max_length=100, null=True, blank=True)
  gym_group = models.CharField(default=None, max_length=50, null=True, blank=True)
  class_type = models.CharField(default=None, max_length=200, null=True, blank=True)
  gym_address = models.CharField(default=None, max_length=200, null=True, blank=True)
  gym_postcode = models.CharField(default=None, max_length=20, null=True, blank=True)
  Lat = models.FloatField(default=None, null=True, blank=True)
  long = models.FloatField(default=None, null=True, blank=True)
  url = models.CharField(default=None, max_length=150, null=True, blank=True)
  Postcode_area =  models.CharField(default=None, max_length=15, null=True, blank=True)
