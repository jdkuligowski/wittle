from django.db import models
# from django.contrib.gis.db import models as gis_models


# Create your models here.
class SearchDetails(models.Model):
    postcode = models.CharField(max_length=1000, default=None, null=True, blank=True)
    subcode = models.CharField(max_length=1000, default=None, null=True, blank=True)
    bathrooms_min = models.FloatField(default=None, null=True, blank=True)
    bathrooms_max = models.FloatField(default=None, null=True, blank=True)
    bedrooms_min = models.FloatField(default=None, null=True, blank=True)   
    bedrooms_max = models.FloatField(default=None, null=True, blank=True)   
    rental_price_min = models.FloatField(default=None, null=True, blank=True)   
    rental_price_max = models.FloatField(default=None, null=True, blank=True)   
    sales_price_min = models.FloatField(default=None, null=True, blank=True)   
    sales_price_max = models.FloatField(default=None, null=True, blank=True)   
    channel = models.CharField(max_length=10, default='Both', null=True, blank=True)
    rental_additional = models.CharField(max_length=35, default=None, null=True, blank=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='lead_gen_details',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )