from django.db import models

# Create your models here.
class Primary(models.Model):
  # Section 1: core property data 
  school_id = models.PositiveIntegerField(default=None, null=True, blank=True)
  local_authority = models.CharField(default=None, max_length=250, null=True, blank=True)
  school_name = models.CharField(default=None, max_length=250, null=True, blank=True)
  town = models.CharField(default=None, max_length=250, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
  postcode_area = models.CharField(default=None, max_length=6, null=True, blank=True)
  school_grouping = models.CharField(default=None, max_length=50, null=True, blank=True)
  gender = models.CharField(default=None, max_length=50, null=True, blank=True)
  religious_grouping = models.CharField(default=None, max_length=100, null=True, blank=True)
  ofsted_results = models.CharField(default=None, max_length=100, null=True, blank=True)
  ofsted_recency = models.CharField(default=None, max_length=100, null=True, blank=True)
  alternative_ofsted = models.CharField(default=None, max_length=100, null=True, blank=True)
  student_number = models.PositiveIntegerField(default=None, null=True, blank=True)
  POI_long = models.FloatField(default=None, null=True, blank=True)
  POI_lat = models.FloatField(default=None, null=True, blank=True)
  area_ref = models.ForeignKey(
        'areas.Area', # this is which model to look for the foreign key on, syntax is "appname.ModelName"
        related_name='primaries', # this is going to be the name of the field on the one in the one-to-many relationhip. Whatever this name is, is what we'll define the field as in the populated serializer later on
        on_delete= models.CASCADE, # if the record does not make sense without it's relation, then we should Cascase (AKA when album is deleted, then delete all the review records that are related to it)
        to_field='area_postcode',
        null=True
    )