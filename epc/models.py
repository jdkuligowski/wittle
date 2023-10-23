from django.db import models

# Create your models here.
class Data(models.Model):
  address = models.CharField(default=None, max_length=200, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  current_energy_efficiency = models.SmallIntegerField(default=None, null=True, blank=True)
  potential_energy_efficiency = models.SmallIntegerField(default=None, null=True, blank=True)
  current_energy_rating = models.CharField(default=None, max_length=20, null=True, blank=True, db_index=True)
  potential_energy_rating = models.CharField(default=None, max_length=20, null=True, blank=True, db_index=True)
  floor_area = models.FloatField(default=None, null=True, blank=True)
  final_floor_level = models.CharField(default=None, max_length=20, null=True, blank=True, db_index=True)
  inspection_date = models.DateField(default=None, null=True, blank=True)

