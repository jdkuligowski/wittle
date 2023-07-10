from django.db import models

# Create your models here.
class TubeSummary(models.Model):
  postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
  tube_10_mins = models.IntegerField(default=None, null=True, blank=True)
  percentile = models.FloatField(default=None, null=True, blank=True)
  postcode_ref = models.OneToOneField(
    'postcodes.Postcodes', 
    related_name='tubes', 
    on_delete=models.CASCADE,
    blank=True,
    null=True,
  )
