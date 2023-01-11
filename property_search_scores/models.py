from django.db import models

# Create your models here.
class PropertySearchScore(models.Model):

  restaurant_score = models.FloatField(default=None, null=True, blank=True)
  takeaway_score = models.FloatField(default=None, null=True, blank=True)
  pubs_score = models.FloatField(default=None, null=True, blank=True)
  cafes_score = models.FloatField(default=None, null=True, blank=True)
  tube_score = models.FloatField(default=None, null=True, blank=True)
  train_score = models.FloatField(default=None, null=True, blank=True)
  primary_score = models.FloatField(default=None, null=True, blank=True)
  secondary_score = models.FloatField(default=None, null=True, blank=True)
  college_score = models.FloatField(default=None, null=True, blank=True)
  supermarket_score = models.FloatField(default=None, null=True, blank=True)
  gym_score = models.FloatField(default=None, null=True, blank=True)
  park_score = models.FloatField(default=None, null=True, blank=True)
  workplace_score = models.FloatField(default=None, null=True, blank=True)
  friends_score = models.FloatField(default=None, null=True, blank=True)
  total_score = models.FloatField(default=None, null=True, blank=True)
  average_score = models.FloatField(default=None, null=True, blank=True)
  owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='property_search_scores',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )
  # search_detail = models.ForeignKey(
  #       'property_search_details.PropertySearch',
  #       related_name='property_search_scores',
  #       on_delete=models.CASCADE,
  #       default=None,
  #       blank=True,
  #       null=True
  # )