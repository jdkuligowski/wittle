from django.db import models


# Create your models here.
class ParksLsoa(models.Model):
  borough = models.CharField(default=None, max_length=30, null=True, blank=True)
  lsoa_code = models.CharField(default=None, max_length=10, null=True, blank=True)
  lsoa_name = models.CharField(default=None, max_length=50, null=True, blank=True)
  deprivation_index = models.DecimalField(default=None, null=True, blank=True, decimal_places=1, max_digits=3)
  park_number_1000 = models.FloatField(default=None)
  park_size_1000 = models.FloatField(default=None)
  london_percentile = models.IntegerField(default=None)
  borough_percentile = models.IntegerField(default=None)
  # lsoa_ref = models.ForeignKey(
  #   'postcodes.Postcodes', 
  #   related_name='parks_lsoa', 
  #   on_delete=models.CASCADE,
  #   to_field='lsoa',
  #   blank=True,
  #   null=True,
  # )
