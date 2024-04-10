from django.db import models

# Create your models here.
class Campaigns(models.Model): 
    campaign_name = models.CharField(max_length=200,null=True, blank=True, default=None)
    campaign_status = models.CharField(max_length=15,null=True, blank=True, default=None)
    campaign_start_date = models.DateField(default=None, null=True, blank=True)
    campaign_type = models.CharField(max_length=100,null=True, blank=True, default=None)
    template_1_name = models.CharField(max_length=100,null=True, blank=True, default=None)
    template_2_name = models.CharField(max_length=100,null=True, blank=True, default=None)
    template_2_date = models.FloatField(default=None, null=True, blank=True)
    template_3_name = models.CharField(max_length=100,null=True, blank=True, default=None)
    template_3_date = models.FloatField(default=None, null=True, blank=True)
    template_4_name = models.CharField(max_length=100,null=True, blank=True, default=None)
    template_4_date = models.FloatField(default=None, null=True, blank=True)
    template_5_name = models.CharField(max_length=100,null=True, blank=True, default=None)
    template_5_date = models.FloatField(default=None, null=True, blank=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='letter_campaigns',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )