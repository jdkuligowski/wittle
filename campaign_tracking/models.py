from django.db import models

# Create your models here.
class Tracker(models.Model): 
    campaign_name = models.CharField(max_length=100,null=True, blank=True, default=None)
    campaign_step = models.FloatField(default=None, null=True, blank=True)
    template_name = models.CharField(max_length=50,null=True, blank=True, default=None)
    target_rightmove_id = models.CharField(max_length=20,null=True, blank=True, default=None)
    target_address = models.CharField(max_length=150,null=True, blank=True, default=None)
    target_name = models.CharField(max_length=50,null=True, blank=True, default=None)
    launch_price = models.CharField(default=None,max_length=50, null=True, blank=True)
    date_added = models.CharField(default=None,max_length=50, null=True, blank=True)
    pdf = models.CharField(max_length=1200,null=True, blank=True, default=None)
    status = models.CharField(max_length=50,null=True, blank=True, default=None)
    status_date = models.DateField(default=None, null=True, blank=True)
    logic_app_run_id = models.CharField(max_length=255, null=True, blank=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='campaign_tracking',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )