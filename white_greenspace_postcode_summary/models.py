from django.db import models

# Create your models here.
class ParksPostcodeSummary(models.Model):
  postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
  total_area_15 = models.FloatField(default=None, null=True, blank=True)
  play_area_15 = models.FloatField(default=None, null=True, blank=True)
  percentile = models.FloatField(default=None, null=True, blank=True)
  play_area_percentile = models.FloatField(default=None, null=True, blank=True)
  postcode_ref = models.OneToOneField(
    'postcodes.Postcodes', 
    related_name='parks_postcode_summary', 
    on_delete=models.CASCADE,
    blank=True,
    null=True,
  )