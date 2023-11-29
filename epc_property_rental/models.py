from django.db import models

# Create your models here.
class Property(models.Model):
  rightmove_id = models.CharField(default=None, max_length=20, null=True, blank=True, unique=True)
  url = models.CharField(default=None, max_length=400, null=True, blank=True)
  title = models.CharField(default=None, max_length=200, null=True, blank=True)
  displayAddress = models.CharField(default=None, max_length=200, null=True, blank=True)
  bathrooms = models.FloatField(default=None, null=True, blank=True)
  bedrooms = models.FloatField(default=None, null=True, blank=True, db_index=True)
  agent = models.CharField(default=None, max_length=100, null=True, blank=True)
  propertyType = models.CharField(default=None, max_length=50, null=True, blank=True)
  price = models.CharField(default=None,max_length=20, null=True, blank=True)
  price_numeric = models.FloatField(default=None, null=True, blank=True, db_index=True)
  secondaryPrice = models.CharField(default=None,max_length=20, null=True, blank=True)
  type = models.CharField(default=None, max_length=10, null=True, blank=True)
  tenure = models.CharField(default=None, max_length=30, null=True, blank=True)
  images = models.CharField(default=None, max_length=200, null=True, blank=True)
  epc = models.CharField(default=None, max_length=200, null=True, blank=True)
  addedOn = models.CharField(default=None, max_length=50, null=True, blank=True)
  added_revised = models.CharField(default=None, max_length=50, null=True, blank=True)
  reduced_revised = models.CharField(default=None, max_length=50, null=True, blank=True)
  let_available_date = models.CharField(default=None, max_length=15, null=True, blank=True)
  let_type = models.CharField(default=None, max_length=50, null=True, blank=True)
  furnish_type = models.CharField(default=None, max_length=100, null=True, blank=True)
  deposit = models.CharField(default=None, max_length=30, null=True, blank=True)
  size = models.CharField(default=None, max_length=30, null=True, blank=True)
  longitude = models.FloatField(default=None, null=True, blank=True)
  latitude = models.FloatField(default=None, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  incode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  outcode = models.CharField(default=None, max_length=10, null=True, blank=True)
  current_epc = models.IntegerField(default=None, null=True, blank=True,  db_index=True)
  potential_epc = models.IntegerField(default=None, null=True, blank=True,  db_index=True)
  date_added_db = models.DateField(default=None, null=True, blank=True)
  status = models.CharField(default=None, max_length=30, null=True, blank=True)
  week_taken_off_market = models.DateField(default=None, null=True, blank=True)


  

