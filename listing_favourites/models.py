from django.db import models

# Create your models here.
class Favourite(models.Model):
    date_added = models.DateField(auto_now_add=True)
    request_type = models.CharField(max_length=20, null=True, blank=True)
    postcode = models.CharField(max_length=10, null=True, blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    channel = models.CharField(max_length=10, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    primary_schools = models.SmallIntegerField(default=0, null=True, blank=True)
    scondary_schools = models.SmallIntegerField(default=0, null=True, blank=True)
    tubes = models.SmallIntegerField(default=0, null=True, blank=True)
    trains = models.SmallIntegerField(default=0, null=True, blank=True)
    evs = models.SmallIntegerField(default=0, null=True, blank=True)
    restaurants = models.SmallIntegerField(default=0, null=True, blank=True)
    pubs = models.SmallIntegerField(default=0, null=True, blank=True)
    parks = models.SmallIntegerField(default=0, null=True, blank=True)
    gyms = models.SmallIntegerField(default=0, null=True, blank=True)
    supermarkets = models.SmallIntegerField(default=0, null=True, blank=True)
    crime = models.SmallIntegerField(default=0, null=True, blank=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='listing_favourites',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )
