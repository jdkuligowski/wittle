from django.db import models

# Create your models here.
class SecondaryResults(models.Model):
  urn = models.IntegerField(default=None, null=True, blank=True)
  school_name = models.CharField(default=None,max_length=150, null=True, blank=True)
  qualification = models.CharField(default=None,max_length=10, null=True, blank=True)
  subject = models.CharField(default=None,max_length=40, null=True, blank=True)
  pass_rate = models.FloatField(default=None, null=True, blank=True)
  top_rate = models.FloatField(default=None, null=True, blank=True)

