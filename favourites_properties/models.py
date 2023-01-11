from django.db import models

# Create your models here.
class Favourite(models.Model):
    favourite = models.BooleanField(default=False, blank=True, null=True),
    property_name = models.CharField(max_length=250, default=False, null=True, blank=True)
    # created_at = models.DateTimeField(auto_now_add=True)
    property = models.ForeignKey(
        'properties.Property',
        related_name='favourites',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='favourites',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )
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

