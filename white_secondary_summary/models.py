from django.db import models

# Create your models here.
class SecondarySummary(models.Model):
  postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
  total_score_percentile = models.FloatField(default=None, null=True, blank=True)
  school1_name = models.CharField(default=None,max_length=150, null=True, blank=True)
  school2_name = models.CharField(default=None,max_length=150, null=True, blank=True)
  postcode_ref = models.OneToOneField(
    'postcodes.Postcodes', 
    related_name='secondaries', 
    on_delete=models.CASCADE,
    blank=True,
    null=True,
  )
