from django.db import models

# Create your models here.
class Takeaway(models.Model):
  name = models.CharField(default=None, max_length=100, null=True, blank=True)
  cuisine = models.CharField(default=None, max_length=200, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=300, null=True, blank=True)
  total_reviews = models.DecimalField(default=None, max_digits=6, decimal_places=1, null=True, blank=True)
  wittle_rating = models.DecimalField(default=None, max_digits=3, decimal_places=1, null=True, blank=True)
  lat = models.FloatField(default=None, null=True, blank=True)
  long = models.FloatField(default=None, null=True, blank=True)
  postcode_area =  models.CharField(default=None, max_length=300, null=True, blank=True)
  url =  models.CharField(default=None, max_length=300, null=True, blank=True)
