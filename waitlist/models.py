from django.db import models

# Create your models here.


class Waitlist(models.Model):
    email = models.CharField(max_length=100, unique=True)
    channel = models.CharField(max_length=10)