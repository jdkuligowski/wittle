from django.db import models

# Create your models here.
class PropertyBar(models.Model):
  # Section 1: core property data 
  property_id = models.PositiveIntegerField(default=None, blank=True)
  # property_name = models.CharField(default=None, max_length=250, null=True, blank=True)
  prop_long = models.FloatField(default=None, null=True, blank=True)
  prop_lat = models.FloatField(default=None, null=True, blank=True)
  pub_name = models.CharField(default=None, max_length=150, null=True, blank=True)
  pub_category_value = models.FloatField(default=None, null=True, blank=True)
  # pub_category = models.CharField(default=None, max_length=150, null=True, blank=True)
  # website = models.CharField(default=None, max_length=150, null=True, blank=True)
  # contact = models.CharField(default=None, max_length=100, null=True, blank=True)
  # pub_address = models.CharField(default=None, max_length=250, null=True, blank=True)
  # postcode = models.CharField(default=None, max_length=20, null=True, blank=True)
  # postcode_area = models.CharField(default=None, max_length=20, null=True, blank=True)
  POI_long = models.FloatField(default=None, null=True, blank=True)
  POI_lat = models.FloatField(default=None, null=True, blank=True)
  # straight_dist_km = models.FloatField(default=None, null=True, blank=True)
  adjusted_dist_km = models.FloatField(default=None, null=True, blank=True)
  walking_time_mins = models.FloatField(default=None, null=True, blank=True)
  # driving_time_mins = models.FloatField(default=None, null=True, blank=True)
  # cycling_time_mins = models.FloatField(default=None, null=True, blank=True)
  property_ref = models.ForeignKey(
        'properties.Property', # this is which model to look for the foreign key on, syntax is "appname.ModelName"
        related_name='bars', # this is going to be the name of the field on the one in the one-to-many relationhip. Whatever this name is, is what we'll define the field as in the populated serializer later on
        on_delete= models.CASCADE, # if the record does not make sense without it's relation, then we should Cascase (AKA when album is deleted, then delete all the review records that are related to it)
        to_field='id',
        null=True
    )