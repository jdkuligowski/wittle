from django.db import models

# Create your models here.
class Property(models.Model):
  name = models.CharField(default=None, max_length=30, null=True, blank=True)
  address = models.CharField(default=None, max_length=50, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=7, null=True, blank=True)
  latitude = models.FloatField(default=None, null=True, blank=True)
  longitude = models.FloatField(default=None, null=True, blank=True)
  price = models.IntegerField(default=None, null=True, blank=True)
  type = models.CharField(default=None, max_length=60, null=True, blank=True)
  size = models.CharField(default=None, max_length=20, null=True, blank=True)
  bedrooms = models.SmallIntegerField(default=None, null=True, blank=True)
  bathrooms = models.SmallIntegerField(default=None, null=True, blank=True)
  living_rooms = models.SmallIntegerField(default=None, null=True, blank=True)
  image = models.CharField(default=None, max_length=200, null=True, blank=True)
  status = models.CharField(default=None, max_length=20, null=True, blank=True)
  agent = models.ForeignKey(
        'jwt_auth.User',
        related_name='white_properties',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
  )

