from django.db import models

# Create your models here.
class Favourite(models.Model):
    favourite = models.BooleanField(default=False, blank=True, null=True),
    property_name = models.CharField(max_length=250, default=False, null=True, blank=True)
    search_name = models.CharField(max_length=100, default=False, null=True, blank=True)
    search_type = models.CharField(max_length=10, default=False, null=True, blank=True)
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
    # scores for property favourited
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

    # inputs for property favourited
    restaurant_input = models.SmallIntegerField(default=None, null=True, blank=True)
    takeaway_input = models.SmallIntegerField(default=None, null=True, blank=True)
    pubs_input = models.SmallIntegerField(default=None, null=True, blank=True)
    cafes_input = models.SmallIntegerField(default=None, null=True, blank=True)
    tube_input = models.SmallIntegerField(default=None, null=True, blank=True)
    train_input = models.SmallIntegerField(default=None, null=True, blank=True)
    primary_input = models.SmallIntegerField(default=None, null=True, blank=True)
    secondary_input = models.SmallIntegerField(default=None, null=True, blank=True)
    college_input = models.SmallIntegerField(default=None, null=True, blank=True)
    supermarket_input = models.SmallIntegerField(default=None, null=True, blank=True)
    gym_input = models.SmallIntegerField(default=None, null=True, blank=True)
    park_input = models.SmallIntegerField(default=None, null=True, blank=True)
    workplace_input = models.SmallIntegerField(default=None, null=True, blank=True)
    friends_input = models.SmallIntegerField(default=None, null=True, blank=True)
    
    # confirmation for favouriting
    restaurant_selection = models.BooleanField(default=False, null=True, blank=True)
    takeaway_selection = models.BooleanField(default=False, null=True, blank=True)
    pubs_selection = models.BooleanField(default=False, null=True, blank=True)
    cafes_selection = models.BooleanField(default=False, null=True, blank=True)
    tube_selection = models.BooleanField(default=False, null=True, blank=True)
    train_selection = models.BooleanField(default=False, null=True, blank=True)
    primary_selection = models.BooleanField(default=False, null=True, blank=True)
    secondary_selection = models.BooleanField(default=False, null=True, blank=True)
    college_selection = models.BooleanField(default=False, null=True, blank=True)
    supermarket_selection = models.BooleanField(default=False, null=True, blank=True)
    gym_selection = models.BooleanField(default=False, null=True, blank=True)
    park_selection = models.BooleanField(default=False, null=True, blank=True)
    workplace_selection = models.BooleanField(default=False, null=True, blank=True)
    friends_selection = models.BooleanField(default=False, null=True, blank=True)