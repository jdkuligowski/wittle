from django.db import models

# Create your models here.
class Usage(models.Model):
    id = models.AutoField(primary_key=True)
    package = models.CharField(max_length=20, default='Free', null=True, blank=True)
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
    total_logins = models.IntegerField(default=None, null=True, blank=True) 
    last_login = models.DateField(default=None, null=True, blank=True)
    save_lead_gen_total = models.IntegerField(default=0, null=True, blank=True)
    save_lead_gen_month_total = models.IntegerField(default=0, null=True, blank=True)
    stripe_customer_id = models.CharField(max_length=255, null=True, blank=True)
    credits = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  
    last_payment_date = models.DateTimeField(null=True, blank=True) 
    days_left = models.SmallIntegerField(default=30, null=True, blank=True)
    date_reset = models.DateField(default=None, null=True, blank=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='usage_stats',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )
