from django.db import models
from white_secondary_results.models import SecondaryResults

# Create your models here.
class SecondaryDetail(models.Model):
  urn = models.IntegerField(default=None, null=True, blank=True)
  local_authority = models.CharField(default=None, max_length=30, null=True, blank=True)
  school_name = models.CharField(default=None, max_length=150, null=True, blank=True)
  school_type = models.CharField(default=None, max_length=30, null=True, blank=True)
  primary_flag = models.SmallIntegerField(default=None, null=True, blank=True)
  secondary_flag = models.SmallIntegerField(default=None, null=True, blank=True)
  sixth_form_flag = models.SmallIntegerField(default=None, null=True, blank=True)
  gender = models.CharField(default=None, max_length=10, null=True, blank=True)
  religion = models.CharField(default=None, max_length=40, null=True, blank=True)
  admissions_policy = models.CharField(default=None, max_length=30, null=True, blank=True)
  ofsted_results = models.CharField(default=None, max_length=20, null=True, blank=True)
  last_ofsted = models.DateField(default=None, null=True, blank=True)
  students = models.IntegerField(default=None, null=True, blank=True)
  pupils_continuing = models.FloatField(default=None, null=True, blank=True)
  latitude = models.FloatField(default=None, null=True, blank=True)
  longitude = models.FloatField(default=None, null=True, blank=True)
  places = models.FloatField(default=None, null=True, blank=True)
  applications = models.FloatField(default=None, null=True, blank=True)
  min_distance = models.CharField(default=None, max_length=20, null=True, blank=True)
  max_distance = models.CharField(default=None, max_length=20, null=True, blank=True)
  other_info = models.CharField(default=None, max_length=20, null=True, blank=True)
  total_pass_rate = models.FloatField(default=None, max_length=20, null=True, blank=True)
  total_top_rate = models.FloatField(default=None, max_length=20, null=True, blank=True)
  percentile = models.FloatField(default=None, null=True, blank=True)
  borough_percentile = models.FloatField(default=None, null=True, blank=True)
  school_url = models.CharField(default=None, max_length=300, null=True, blank=True)
  image_url = models.CharField(default=None, max_length=500, null=True, blank=True)

  @property
  def results(self):
    return SecondaryResults.objects.filter(urn=self.urn)