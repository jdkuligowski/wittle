from django.db import models

# Create your models here.
class Ward(models.Model):
  borough = models.CharField(default=None, max_length=30, null=True, blank=True)
  ward = models.CharField(default=None, max_length=50, null=True, blank=True)
  ward_avg_price = models.IntegerField(default=None, null=True, blank=True)
  ward_transactions = models.IntegerField(default=None, null=True, blank=True)

