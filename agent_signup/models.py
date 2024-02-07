from django.db import models

# Create your models here.


class AgentSignup(models.Model):
    email = models.CharField(max_length=100)
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    position = models.CharField(default=None, max_length=50, null=True, blank=True)
    message = models.CharField(default=None, max_length=500, null=True, blank=True)
