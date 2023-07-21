from django.db import models

# Create your models here.
class PubSummary(models.Model):
      postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
      pub_count = models.SmallIntegerField(default=None, null=True, blank=True)
      pub_score = models.IntegerField(default=None, null=True, blank=True)
      normal_percentile = models.FloatField(default=None, null=True, blank=True)
      normal_percentile = models.FloatField(default=None, null=True, blank=True)
      ward_percentile = models.FloatField(default=None, null=True, blank=True)
      borough_percentile = models.FloatField(default=None, null=True, blank=True)
      postcode_ref = models.OneToOneField(
        'postcodes.Postcodes', 
        related_name='pubs', 
        on_delete=models.CASCADE,
        blank=True,
        null=True,
      )