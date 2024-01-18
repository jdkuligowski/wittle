from django.db import models

class ClientFavourites(models.Model):
  rightmove_id = models.CharField(default=None, max_length=20, null=True, blank=True, unique=True)
  url = models.CharField(default=None, max_length=400, null=True, blank=True)
  displayAddress = models.CharField(default=None, max_length=200, null=True, blank=True)
  bathrooms = models.FloatField(default=None, null=True, blank=True)
  bedrooms = models.FloatField(default=None, null=True, blank=True)
  agent = models.CharField(default=None, max_length=100, null=True, blank=True)
  propertyType = models.CharField(default=None, max_length=50, null=True, blank=True)
  price_numeric = models.FloatField(default=None, null=True, blank=True, db_index=True)
  images = models.CharField(default=None, max_length=200, null=True, blank=True)
  score = models.FloatField(default=None, null=True, blank=True, db_index=True)
  channel = models.CharField(default=None, max_length=10, null=True, blank=True)
  client = models.ForeignKey(
        'agent_client_details.ClientDetails',
        related_name='client_saved_properties',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )



