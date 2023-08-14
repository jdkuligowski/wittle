from django.db import models

# Create your models here.
class Train(models.Model):
  # Section 1: core property data 
  station = models.CharField(default=None, max_length=250, null=True, blank=True)
  local_authority = models.CharField(default=None, max_length=40, null=True, blank=True)
  line = models.CharField(default=None, max_length=250, null=True, blank=True)
  latitude = models.FloatField(default=None, null=True, blank=True)
  longitude = models.FloatField(default=None, null=True, blank=True)