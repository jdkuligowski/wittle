from django.db import models

# Create your models here.
class Usage(models.Model):
    package = models.CharField(max_length=20, default=False, null=True, blank=True)
    epc_tier = models.SmallIntegerField(default=0, null=True, blank=True)
    epc_total_count = models.IntegerField(default=0, null=True, blank=True)
    epc_monthly_count = models.IntegerField(default=0, null=True, blank=True)
    listing_tier = models.SmallIntegerField(default=0, null=True, blank=True)
    listing_total_count = models.IntegerField(default=0, null=True, blank=True)
    listing_monthly_count = models.IntegerField(default=0, null=True, blank=True)
    listing_normal_total = models.IntegerField(default=0, null=True, blank=True)
    listing_ai_total = models.IntegerField(default=0, null=True, blank=True)
    listing_insight_total = models.IntegerField(default=0, null=True, blank=True)
    valuation_tier = models.SmallIntegerField(default=0, null=True, blank=True)
    valuation_total_count = models.IntegerField(default=0, null=True, blank=True)
    valuation_monthly_count = models.IntegerField(default=0, null=True, blank=True)    
    last_update_month = models.IntegerField(null=True, blank=True) 
    last_update_year = models.IntegerField(null=True, blank=True) 
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='usage_stats',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )