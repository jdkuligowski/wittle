from django.db import models

# Create your models here.
class Property(models.Model):
  rightmove_id = models.CharField(default=None, max_length=20, null=True, blank=True, unique=True)
  url = models.CharField(default=None, max_length=400, null=True, blank=True)
  title = models.CharField(default=None, max_length=200, null=True, blank=True)
  displayAddress = models.CharField(default=None, max_length=200, null=True, blank=True)
  bathrooms = models.FloatField(default=None, null=True, blank=True)
  bedrooms = models.FloatField(default=None, null=True, blank=True)
  agent = models.CharField(default=None, max_length=100, null=True, blank=True)
  propertyType = models.CharField(default=None, max_length=50, null=True, blank=True)
  price = models.CharField(default=None,max_length=20, null=True, blank=True)
  price_numeric = models.FloatField(default=None, null=True, blank=True, db_index=True)
  type = models.CharField(default=None, max_length=10, null=True, blank=True)
  tenure = models.CharField(default=None, max_length=30, null=True, blank=True)
  images = models.CharField(default=None, max_length=200, null=True, blank=True)
  floorplan_url = models.CharField(default=None, max_length=400, null=True, blank=True)
  epc = models.CharField(default=None, max_length=200, null=True, blank=True)
  addedOn = models.CharField(default=None, max_length=50, null=True, blank=True)
  added_revised = models.CharField(default=None, max_length=50, null=True, blank=True)
  reduced_revised = models.CharField(default=None, max_length=50, null=True, blank=True)
  size = models.CharField(default=None, max_length=30, null=True, blank=True)
  longitude = models.FloatField(default=None, null=True, blank=True)
  latitude = models.FloatField(default=None, null=True, blank=True)
  postcode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  incode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  outcode = models.CharField(default=None, max_length=10, null=True, blank=True)
  subcode = models.CharField(default=None, max_length=10, null=True, blank=True, db_index=True)
  current_epc = models.IntegerField(default=None, null=True, blank=True,  db_index=True)
  potential_epc = models.IntegerField(default=None, null=True, blank=True,  db_index=True)
  current_letter = models.CharField(max_length=2, default=None, null=True, blank=True,  db_index=True)
  potential_letter = models.CharField(max_length=2, default=None, null=True, blank=True,  db_index=True)
  date_added_db = models.DateField(default=None, null=True, blank=True)
  status = models.CharField(default=None, max_length=30, null=True, blank=True)
  week_taken_off_market = models.DateField(default=None, null=True, blank=True)
  features = models.CharField(default=None, max_length=3000, null=True, blank=True)
  priceHistory = models.CharField(default=None, max_length=1500, null=True, blank=True)
  price_per_sqft = models.FloatField(default=None, null=True, blank=True)






