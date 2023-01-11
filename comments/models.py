from django.db import models

# Create your models here.
class Comment(models.Model):
    text = models.TextField(max_length=300, default=None,blank=True, null=True) # this is same type (varchar) as CharField, but gives us a bigger textbox to fill out on the admin system
    created_at = models.DateTimeField(auto_now_add=True) # timestamps for our review, auto_now_add set to True adds the time of submission as the time
    property = models.ForeignKey(
        'properties.Property', # this is which model to look for the foreign key on, syntax is "appname.ModelName"
        related_name='comments', # this is going to be the name of the field on the one in the one-to-many relationhip. Whatever this name is, is what we'll define the field as in the populated serializer later on
        on_delete= models.CASCADE, # if the record does not make sense without it's relation, then we should Cascase (AKA when album is deleted, then delete all the review records that are related to it)
        default=None,
        blank=True,
        null=True
    )
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='comments',
        on_delete=models.CASCADE,
    )