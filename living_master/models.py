from django.db import models

# Create your models here.
class City(models.Model):
  city = models.CharField(default=None, max_length=100, null=True, blank=True)
