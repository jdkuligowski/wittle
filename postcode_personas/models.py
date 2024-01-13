from django.db import models
# from django.contrib.gis.db import models as gis_models


# Create your models here.
class PersonaDetails(models.Model):
    postcode = models.CharField(max_length=1000, default=None, null=True, blank=True, db_index=True)
    latitude = models.FloatField(default=None, null=True, blank=True)
    longitude = models.FloatField(default=None, null=True, blank=True)
    district = models.CharField(default=None, max_length=40, null=True, blank=True)
    restaurant_percentile = models.FloatField(default=None, null=True, blank=True)
    pub_percentile = models.FloatField(default=None, null=True, blank=True)
    park_area_percentile = models.FloatField(default=None, null=True, blank=True)
    play_area_percentile = models.FloatField(default=None, null=True, blank=True)
    gym_percentile = models.FloatField(default=None, null=True, blank=True)
    ev_percentile = models.FloatField(default=None, null=True, blank=True)
    tube_percentile = models.FloatField(default=None, null=True, blank=True)
    secondary_percentile = models.FloatField(default=None, null=True, blank=True)
    primary_percentile = models.FloatField(default=None, null=True, blank=True)
    crime_percentile = models.FloatField(default=None, null=True, blank=True)

