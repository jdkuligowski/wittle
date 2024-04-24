from django.db import models
# from django.contrib.gis.db import models as gis_models

# Create your models here.
class Outcodes(models.Model):
    outcode = models.CharField(max_length=4, default=None, null=True, blank=True)
