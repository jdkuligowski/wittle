from django.db import models

# Create your models here.
class PropertySearch(models.Model):
  # general section
  result_id = models.AutoField(primary_key=True)
  start_search = models.BooleanField(default=True)
  search_name = models.TextField(default=None, null=True, blank=True)
  search_type = models.TextField(default=None, null=True, blank=True)
  search_channel = models.TextField(default=None, null=True, blank=True)
  # restaurant section
  restaurant_selection = models.BooleanField(default=False, null=True, blank=True)
  restaurant_decision = models.CharField(max_length=15, default=False, null=True, blank=True)
  restaurant_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  restaurant_cuisine_1 = models.CharField(max_length=30, default=False, null=True, blank=True)
  restaurant_cuisine_2 = models.CharField(max_length=30, default=False, null=True, blank=True)
  # takeaway section
  takeaway_selection = models.BooleanField(default=False, null=True, blank=True)
  takeaway_decision = models.CharField(max_length=15, default=False, null=True, blank=True)
  takeaway_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  takeaway_cuisine_1 = models.CharField(max_length=30, default=False, null=True, blank=True)
  takeaway_cuisine_2 = models.CharField(max_length=30, default=False, null=True, blank=True)
  # pub section
  pubs_selection = models.BooleanField(default=False, null=True, blank=True)
  pubs_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # cafe section
  cafes_selection = models.BooleanField(default=False, null=True, blank=True)
  cafes_decision = models.CharField(max_length=15, default=False, null=True, blank=True)
  cafes_detail = models.CharField(max_length=15, default=False, null=True, blank=True)
  cafes_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # tube section
  tube_selection = models.BooleanField(default=False, null=True, blank=True)
  tube_decision = models.CharField(max_length=200, default=False, null=True, blank=True)
  tube_detail = models.CharField(max_length=200, default=False, null=True, blank=True)
  tube_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # train section
  train_selection = models.BooleanField(default=False, null=True, blank=True)
  train_decision = models.CharField(max_length=200, default=False, null=True, blank=True)
  train_detail = models.CharField(max_length=200, default=False, null=True, blank=True)
  train_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # primary school section
  primary_selection = models.BooleanField(default=False, null=True, blank=True)
  primary_religion = models.CharField(max_length=30, default=False, null=True, blank=True)
  primary_mode = models.CharField(max_length=30, default=False, null=True, blank=True)
  primary_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # secondary school section
  secondary_selection = models.BooleanField(default=False, null=True, blank=True)
  secondary_religion = models.CharField(max_length=30, default=False, null=True, blank=True)
  secondary_mode = models.CharField(max_length=30, default=False, null=True, blank=True)
  secondary_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # college section
  college_selection = models.BooleanField(default=False, null=True, blank=True)
  college_religion = models.CharField(max_length=30, default=False, null=True, blank=True)
  college_mode = models.CharField(max_length=30, default=False, null=True, blank=True)
  college_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # supermarket section
  supermarket_selection = models.BooleanField(default=False, null=True, blank=True)
  supermarket_decision = models.CharField(max_length=30, default=False, null=True, blank=True)
  supermarket_segment = models.CharField(max_length=30, default=False, null=True, blank=True)
  supermarket_size = models.CharField(max_length=30, default=False, null=True, blank=True)
  supermarket_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # gym section
  gym_selection = models.BooleanField(default=False, null=True, blank=True)
  gym_studio_name = models.CharField(max_length=30, default=False, null=True, blank=True)
  gym_class_type = models.CharField(max_length=30, default=False, null=True, blank=True)
  gym_distance = models.PositiveIntegerField(default=False, null=True, blank=True)
  # park section
  park_selection = models.BooleanField(default=False, null=True, blank=True)
  park_type = models.CharField(max_length=100, default=False, null=True, blank=True)
  park_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # workplace section
  workplace_selection = models.BooleanField(default=False, null=True, blank=True)
  workplace_detail = models.CharField(max_length=30, default=False, null=True, blank=True)
  workplace_transport = models.CharField(max_length=30, default=False, null=True, blank=True)
  workplace_distance = models.PositiveIntegerField(default=0, null=True, blank=True)
  # family section
  family_selection = models.BooleanField(default=False, null=True, blank=True)
  family_detail_1 = models.CharField(max_length=30, default=False, null=True, blank=True)
  family_mode_1 = models.CharField(max_length=30, default=False, null=True, blank=True)
  family_distance_1 = models.PositiveIntegerField(default=0, null=True, blank=True)
  family_detail_2 = models.CharField(max_length=30, default=False, null=True, blank=True)
  family_mode_2 = models.CharField(max_length=30, default=False, null=True, blank=True)
  family_distance_2 = models.PositiveIntegerField(default=0, null=True, blank=True)
  family_detail_3 = models.CharField(max_length=30, default=False, null=True, blank=True)
  family_mode_3 = models.CharField(max_length=30, default=False, null=True, blank=True)
  family_distance_3 = models.PositiveIntegerField(default=0, null=True, blank=True)
  # property inputs section
  property_price_min = models.PositiveBigIntegerField(default=False, null=True, blank=True)
  property_price_max = models.PositiveBigIntegerField(default=False, null=True, blank=True)
  property_bed_min = models.PositiveBigIntegerField(default=False, null=True, blank=True)
  property_bed_max = models.PositiveBigIntegerField(default=False, null=True, blank=True)
  property_type = models.CharField(max_length=20, default=False, null=True, blank=True)
  # scores section
  top_score = models.FloatField(default=None, null=True, blank=True)
  average_score = models.FloatField(default=None, null=True, blank=True)
  total_properties = models.PositiveBigIntegerField(default=False, null=True, blank=True)
  owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='property_search_details',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )
  
  class Meta: 
    unique_together = ('owner', 'search_name')