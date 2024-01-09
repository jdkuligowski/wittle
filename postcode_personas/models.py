from django.db import models
# from django.contrib.gis.db import models as gis_models


# Create your models here.
class PersonaDetails(models.Model):
    postcode = models.CharField(max_length=1000, default=None, null=True, blank=True, db_index=True)
    latitude = models.FloatField(default=None, null=True, blank=True)
    longitude = models.FloatField(default=None, null=True, blank=True)
    lsoa = models.CharField(default=None, max_length=40, null=True, blank=True)
    young_families = models.FloatField(default=None, null=True, blank=True)
    young_professionals = models.FloatField(default=None, null=True, blank=True)
    vibes = models.FloatField(default=None, null=True, blank=True)
    commuter_convenience = models.FloatField(default=None, null=True, blank=True)

