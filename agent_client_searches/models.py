from django.db import models

# Create your models here.


class ClientSearches(models.Model):
    channel =  models.CharField(default=None, max_length=10, null=True, blank=True)
    area =  models.CharField(default=None, max_length=100, null=True, blank=True)
    search_name =  models.CharField(default=None, max_length=100, null=True, blank=True)
    propertyType =  models.CharField(default=None, max_length=100, null=True, blank=True)
    garden =  models.BooleanField(default=None, null=True, blank=True)
    size = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)
    bedrooms_min =  models.SmallIntegerField(default=None, null=True, blank=True)
    bedrooms_max =  models.SmallIntegerField(default=None, null=True, blank=True)
    price_min = models.IntegerField(default=None, null=True, blank=True)
    price_max = models.IntegerField(default=None, null=True, blank=True)
    primaries =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    primaries_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    secondaries =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    secondaries_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    parks =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    parks_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    playgrounds =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    playgrounds_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    gyms =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    gyms_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    restaurants =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    restaurants_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    pubs =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    pubs_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    tubes =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    tubes_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    supermarkets =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    supermarkets_score = models.SmallIntegerField(default=None, null=True, blank=True)
    ev =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    ev_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    crime =  models.BooleanField(default=None, max_length=100, null=True, blank=True)
    crime_score =  models.SmallIntegerField(default=None, null=True, blank=True)
    client = models.ForeignKey(
        'agent_client_details.ClientDetails',
        related_name='client_saved_searches',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )


