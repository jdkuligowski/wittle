from django.db import models

# Create your models here.
class Entry(models.Model):
  address = models.CharField(default=None, max_length=100, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
  owner_name = models.CharField(default=None, max_length=100, null=True, blank=True)
  owner_first_name = models.CharField(default=None, max_length=50, null=True, blank=True)
  owner_second_name = models.CharField(default=None, max_length=50, null=True, blank=True)
  deed_copy = models.CharField(default=None, max_length=400, null=True, blank=True)
