from django.db import models

# Create your models here.
class ParksPostcode(models.Model):
  postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
  distance0 = models.FloatField(default=None, null=True, blank=True)
  distance1 = models.FloatField(default=None, null=True, blank=True)
  distance2 = models.FloatField(default=None, null=True, blank=True)
  distance3 = models.FloatField(default=None, null=True, blank=True)
  distance4 = models.FloatField(default=None, null=True, blank=True)
  park_name0 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_name1 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_name2 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_name3 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_name4 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_use0 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_use1 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_use2 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_use3 = models.CharField(default=None, max_length=150, null=True, blank=True)
  park_use4 = models.CharField(default=None, max_length=150, null=True, blank=True)
  postcode_ref = models.OneToOneField(
    'postcodes.Postcodes', 
    related_name='parks_postcode', 
    on_delete=models.CASCADE,
    blank=True,
    null=True,
  )