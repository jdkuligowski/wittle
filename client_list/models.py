from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=100)
    logo = models.CharField(max_length=100, blank=True, null=True)