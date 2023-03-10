from django.db import models

# Create your models here.
class PropertyPercentiles(models.Model):
  property_id = models.PositiveIntegerField(default=None, blank=True)
  property_name = models.CharField(default=None, max_length=250, null=True, blank=True)
  prop_long = models.FloatField(default=None, null=True, blank=True)
  prop_lat = models.FloatField(default=None, null=True, blank=True)
  postcode_district = models.CharField(default=None, max_length=5, null=True, blank=True)
  overall_area = models.CharField(default=None, max_length=20, null=True, blank=True)
  restaurant_score = models.PositiveIntegerField(default=None, null=True, blank=True)
  all_restaurants = models.FloatField(default=None, null=True, blank=True)
  london_borough_restaurants = models.FloatField(default=None, null=True, blank=True)
  london_region_restaurants = models.FloatField(default=None, null=True, blank=True)
  bar_score = models.FloatField(default=None, null=True, blank=True)
  all_bars = models.FloatField(default=None, null=True, blank=True)
  london_borough_bars = models.FloatField(default=None, null=True, blank=True)
  london_region_bars = models.FloatField(default=None, null=True, blank=True)
  takeaway_score = models.FloatField(default=None, null=True, blank=True)
  all_takeaways = models.FloatField(default=None, null=True, blank=True)
  london_borough_takeaways = models.FloatField(default=None, null=True, blank=True)
  london_region_takeaways = models.FloatField(default=None, null=True, blank=True)
  gym_score = models.FloatField(default=None, null=True, blank=True)
  all_gyms = models.FloatField(default=None, null=True, blank=True)
  london_borough_gyms = models.FloatField(default=None, null=True, blank=True)
  london_region_gyms = models.FloatField(default=None, null=True, blank=True)
  tube_score = models.FloatField(default=None, null=True, blank=True)
  all_tubes = models.FloatField(default=None, null=True, blank=True)
  london_borough_tubes = models.FloatField(default=None, null=True, blank=True)
  london_region_tubes = models.FloatField(default=None, null=True, blank=True)
  park_score = models.FloatField(default=None, null=True, blank=True)
  all_parks = models.FloatField(default=None, null=True, blank=True)
  london_borough_parks = models.FloatField(default=None, null=True, blank=True)
  london_region_parks = models.FloatField(default=None, null=True, blank=True)
  supermarket_score = models.FloatField(default=None, null=True, blank=True)
  all_supermarkets = models.FloatField(default=None, null=True, blank=True)
  london_borough_supermarkets = models.FloatField(default=None, null=True, blank=True)
  london_region_supermarkets = models.FloatField(default=None, null=True, blank=True)
  primary_score = models.FloatField(default=None, null=True, blank=True)
  all_primaries = models.FloatField(default=None, null=True, blank=True)
  london_borough_primaries = models.FloatField(default=None, null=True, blank=True)
  london_region_primaries = models.FloatField(default=None, null=True, blank=True)
  secondary_score = models.FloatField(default=None, null=True, blank=True)
  all_secondaries = models.FloatField(default=None, null=True, blank=True)
  london_borough_secondaries = models.FloatField(default=None, null=True, blank=True)
  london_region_secondaries = models.FloatField(default=None, null=True, blank=True)
  college_score = models.FloatField(default=None, null=True, blank=True)
  all_colleges = models.FloatField(default=None, null=True, blank=True)
  london_borough_colleges = models.FloatField(default=None, null=True, blank=True)
  london_region_colleges = models.FloatField(default=None, null=True, blank=True)
  property_ref = models.ForeignKey(
        'properties.Property', # this is which model to look for the foreign key on, syntax is "appname.ModelName"
        related_name='percentiles', # this is going to be the name of the field on the one in the one-to-many relationhip. Whatever this name is, is what we'll define the field as in the populated serializer later on
        on_delete= models.CASCADE, # if the record does not make sense without it's relation, then we should Cascase (AKA when album is deleted, then delete all the review records that are related to it)
        to_field='id',
        null=True
    )