from django.db import models

# Create your models here.
class RestaurantSummary(models.Model):
  postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
  restaurant_count = models.IntegerField(default=None, null=True, blank=True)
  restaurant_score = models.IntegerField(default=None, null=True, blank=True)
  normal_percentile = models.FloatField(default=None, null=True, blank=True)
  ward_percentile = models.FloatField(default=None, null=True, blank=True)
  borough_percentile = models.FloatField(default=None, null=True, blank=True)
  postcode_ref = models.OneToOneField(
    'postcodes.Postcodes', 
    related_name='restaurants', 
    on_delete=models.CASCADE,
    blank=True,
    null=True,
  )