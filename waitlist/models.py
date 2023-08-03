from django.db import models
from django.utils import timezone


# Create your models here.


class Waitlist(models.Model):
    email = models.CharField(max_length=100, unique=True)
    channel = models.CharField(max_length=10)
    preferences = models.BooleanField(default=True)
    created_at = models.DateField(auto_now_add=True)

