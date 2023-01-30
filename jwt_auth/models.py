from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=50, unique=True, blank=True, null=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    permissions = models.BooleanField(default=True, null=True, blank=True)
    profile_image = models.CharField(max_length=300, blank=True)