from django.db import models

# Create your models here.

class Restaurant(models.Model):
      restaurant_name = models.CharField(default=None, max_length=200, null=True, blank=True)
      cuisine = models.CharField(default=None, max_length=30, null=True, blank=True)
      master_cuisine = models.CharField(default=None, max_length=30, null=True, blank=True)
      rating = models.FloatField(default=None, null=True, blank=True)
      reviews = models.DecimalField(default=None, null=True, blank=True, max_digits=6, decimal_places=1)
      postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
      lat = models.FloatField(default=None, null=True, blank=True)
      long = models.FloatField(default=None, null=True, blank=True)
      source = models.CharField(default=None, max_length=40, null=True, blank=True)
      url = models.CharField(default=None, max_length=150, null=True, blank=True)
      postcode_area = models.CharField(default=None, max_length=5, null=True, blank=True)
      city_ref = models.ForeignKey(
        'living_master.City',
        related_name='restaurants',       
        on_delete= models.CASCADE,
        null=True
      )



