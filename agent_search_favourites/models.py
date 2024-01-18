from django.db import models

class AgentFavourites(models.Model):
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
  owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='agent_saved_properties',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )



