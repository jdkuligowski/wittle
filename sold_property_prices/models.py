from django.db import models

# Create your models here.
class Prices(models.Model):
  uprn = models.FloatField(default=None, null=True, blank=True)
  sold_price = models.FloatField(default=None, null=True, blank=True)
  sold_date = models.DateField(default=None, null=True, blank=True)
  property = models.ForeignKey(
        'sold_properties.Property', 
        related_name='sold_prices',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )