from django.db import models

# Create your models here.
class PubList(models.Model):
    name = models.CharField(default=None, max_length=100, null=True, blank=True)
    operator = models.CharField(default=None, max_length=50, null=True, blank=True)
    postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
    latitude = models.FloatField(default=None, null=True, blank=True)
    longitude = models.FloatField(default=None, null=True, blank=True)
    district = models.CharField(default=None, max_length=40, null=True, blank=True)
    rank = models.CharField(default=None, max_length=10, null=True, blank=True)
