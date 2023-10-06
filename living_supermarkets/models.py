from django.db import models

# Create your models here.

class Supermarket(models.Model):
      supermarket_brand = models.CharField(default=None, max_length=150, null=True, blank=True)
      supermarket_bramd_category = models.CharField(default=None, max_length=150, null=True, blank=True)
      supermarket_store_name = models.CharField(default=None, max_length=150, null=True, blank=True)
      segment = models.CharField(default=None, max_length=40, null=True, blank=True)
      store_size = models.CharField(default=None, max_length=30, null=True, blank=True)
      postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
      latitude = models.FloatField(default=None, null=True, blank=True)
      longitude = models.FloatField(default=None, null=True, blank=True)


