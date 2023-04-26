from django.db import models

# Create your models here.
class Primary(models.Model):
  school_name = models.CharField(default=None, max_length=100, null=True, blank=True)
  town = models.CharField(default=None, max_length=30, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
  school_status = models.CharField(default=None, max_length=30, null=True, blank=True)
  school_grouping = models.CharField(default=None, max_length=30, null=True, blank=True)
  gender = models.CharField(default=None, max_length=20, null=True, blank=True)
  religious_grouping = models.CharField(default=None, max_length=50, null=True, blank=True)
  ofsted_results = models.CharField(default=None, max_length=30, null=True, blank=True)
  last_ofsted_inspection = models.CharField(default=None, max_length=30, null=True, blank=True)
  students =  models.DecimalField(default=None, max_digits=4, decimal_places=1, null=True, blank=True)
  ofsted_recency =  models.CharField(default=None, max_length=30, null=True, blank=True)
  alternative_ofsted =  models.CharField(default=None, max_length=30, null=True, blank=True)
  lat = models.FloatField(default=None, null=True, blank=True)
  long = models.FloatField(default=None, null=True, blank=True)
  postcode_area =  models.CharField(default=None, max_length=10, null=True, blank=True)
  url =  models.CharField(default=None, max_length=200, null=True, blank=True)
  city_ref = models.ForeignKey(
        'living_master.City',
        related_name='primaries', 
        on_delete= models.CASCADE,
        null=True
    )
  image_url =  models.CharField(default=None, max_length=520, null=True, blank=True)
