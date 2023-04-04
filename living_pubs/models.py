from django.db import models

# Create your models here.
class Pub(models.Model):
  Pub_name = models.CharField(default=None, max_length=100, null=True, blank=True)
  Pub_category = models.CharField(default=None, max_length=20, null=True, blank=True)
  Pub_address = models.CharField(default=None, max_length=200, null=True, blank=True)
  Pub_street = models.CharField(default=None, max_length=150, null=True, blank=True)
  Pub_town = models.CharField(default=None, max_length=20, null=True, blank=True)
  Pub_postcode = models.CharField(default=None, max_length=20, null=True, blank=True)
  Website = models.CharField(default=None, max_length=200, null=True, blank=True)
  Contact = models.CharField(default=None, max_length=20, null=True, blank=True)
  url = models.CharField(default=None, max_length=200, null=True, blank=True)
  Lat = models.FloatField(default=None, null=True, blank=True)
  long = models.FloatField(default=None, null=True, blank=True)
  Postcode_area =  models.CharField(default=None, max_length=15, null=True, blank=True)
  city_ref = models.ForeignKey(
        'living_master.City',
        related_name='pubs', 
        on_delete= models.CASCADE,
        null=True
    )