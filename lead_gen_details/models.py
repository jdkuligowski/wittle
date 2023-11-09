from django.db import models
# from django.contrib.gis.db import models as gis_models


# Create your models here.
class SearchDetails(models.Model):
    postcode = models.CharField(max_length=1000)
    bathrooms_min = models.FloatField(default=None, null=True, blank=True)
    bathrooms_max = models.FloatField(default=None, null=True, blank=True)
    bedrooms_min = models.FloatField(default=None, null=True, blank=True)   
    bedrooms_max = models.FloatField(default=None, null=True, blank=True)   
    price_min = models.FloatField(default=None, null=True, blank=True)   
    price_max = models.FloatField(default=None, null=True, blank=True)   
    channel = models.CharField(max_length=10)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='lead_gen_details',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )