from django.db import models

# Create your models here.
class Area(models.Model):
  area_name = models.CharField(default=None, max_length=200)
  area_description = models.TextField(default=None, max_length=1000)
  area_postcode = models.CharField(default=None, max_length=10, unique=True)
  area_image = models.CharField(default=None, max_length=250)

  def __str__(self):
    return f"{self.area_name} ({self.area_postcode})"
