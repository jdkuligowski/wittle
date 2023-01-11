from django.db import models

# Create your models here.


class Property(models.Model):
    # Section 1: core property data
    property_name = models.CharField(default=None, max_length=250)
    property_description = models.CharField(default=None, max_length=5000)
    property_image_1 = models.CharField(default=None, max_length=250)
    property_image_2 = models.CharField(default=None, max_length=250)
    type = models.CharField(default=None, max_length=250)
    bedrooms = models.PositiveIntegerField(default=None)
    value = models.PositiveIntegerField(default=None)
    floorplan = models.CharField(default=None, max_length=250)
    long = models.FloatField(default=None)
    Lat = models.FloatField(default=None)
    estate_agent = models.CharField(default=None, max_length=250)
    estate_agent_number = models.CharField(default=None, max_length=250)
    # favourites = models.ManyToManyField(
    #   'favourites_properties.Favourite', # model that this field is related to
    #   related_name='property'
    # )

    def __str__(self):
        return f"{self.property_name} - {self.type} ({self.estate_agent})"


# # Create your models here.
# class PropertyTube(models.Model):
#   # Section 1: core property data
#   property_id = models.PositiveIntegerField(default=None, blank=True)
#   property_name = models.CharField(default=None, max_length=250, null=True, blank=True)
#   prop_long = models.FloatField(default=None, null=True, blank=True)
#   prop_lat = models.FloatField(default=None, null=True, blank=True)
#   station_name = models.CharField(default=None, max_length=250, null=True, blank=True)
#   line = models.CharField(default=None, max_length=250, null=True, blank=True)
#   postcode = models.CharField(default=None, max_length=10, null=True, blank=True)
#   postcode_area = models.CharField(default=None, max_length=6, null=True, blank=True)
#   POI_long = models.FloatField(default=None, null=True, blank=True)
#   POI_lat = models.FloatField(default=None, null=True, blank=True)
#   straight_dist_km = models.FloatField(default=None, null=True, blank=True)
#   adjusted_dist_km = models.FloatField(default=None, null=True, blank=True)
#   walking_time_mins = models.FloatField(default=None, null=True, blank=True)
#   driving_time_mins = models.FloatField(default=None, null=True, blank=True)
#   cycling_time_mins = models.FloatField(default=None, null=True, blank=True)
#   property_ref = models.ForeignKey(
#         'properties.Property', # this is which model to look for the foreign key on, syntax is "appname.ModelName"
#         related_name='tubes', # this is going to be the name of the field on the one in the one-to-many relationhip. Whatever this name is, is what we'll define the field as in the populated serializer later on
#         on_delete= models.CASCADE, # if the record does not make sense without it's relation, then we should Cascase (AKA when album is deleted, then delete all the review records that are related to it)
#         to_field='id',
#         null=True
#     )
