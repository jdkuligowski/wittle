from django.db import models

# Create your models here.

class Living(models.Model):
    # Section 1: core property data
    email_address = models.CharField(default=None, max_length=100, null=True, blank=True)
    long = models.FloatField(default=None, null=True, blank=True)
    lat = models.FloatField(default=None, null=True, blank=True)
    subscription_type = models.SmallIntegerField(default=False, null=True, blank=True)
    email_status = models.SmallIntegerField(default=False, null=True, blank=True)

    admin_status = models.SmallIntegerField(default=False, null=True, blank=True)
    admin_populated = models.SmallIntegerField(default=False, null=True, blank=True)
    lifestyle_status = models.SmallIntegerField(default=False, null=True, blank=True)
    property_status = models.SmallIntegerField(default=False, null=True, blank=True)

    mortgage_status = models.SmallIntegerField(default=False, null=True, blank=True)
    mortgage_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    mortgage_value = models.FloatField(default=0, null=True, blank=True)
    mortgage_date = models.DateField(default=None, null=True, blank=True)
    mortgage_notes = models.CharField(default=None, max_length=100, null=True, blank=True)

    rent_status = models.SmallIntegerField(default=False, null=True, blank=True)
    rent_value = models.FloatField(default=0, null=True, blank=True)
    rent_date = models.DateField(default=None, null=True, blank=True)
    rent_notes = models.CharField(default=None, max_length=100, null=True, blank=True)

    boiler_status = models.SmallIntegerField(default=False, null=True, blank=True)
    boiler_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    boiler_value = models.FloatField(default=0, null=True, blank=True)
    boiler_date = models.DateField(default=None, null=True, blank=True)
    boiler_notes = models.CharField(default=None, max_length=100, null=True, blank=True)

    insurance_status = models.SmallIntegerField(default=False, null=True, blank=True)
    insurance_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    insurance_value = models.FloatField(default=0, null=True, blank=True)
    insurance_date = models.DateField(default=None, null=True, blank=True)
    insurance_notes = models.CharField(default=None, max_length=100, null=True, blank=True)

    energy_status = models.SmallIntegerField(default=False, null=True, blank=True)
    energy_detail = models.CharField(default=None, max_length=10, null=True, blank=True)
    energy_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    energy_value = models.FloatField(default=0, null=True, blank=True)
    energy_date = models.DateField(default=None, null=True, blank=True)
    energy_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    gas_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    gas_value = models.FloatField(default=0, null=True, blank=True)
    gas_date = models.DateField(default=None, null=True, blank=True)
    gas_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    electric_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    electric_value = models.FloatField(default=0, null=True, blank=True)
    electric_date = models.DateField(default=None, null=True, blank=True)
    electric_notes = models.CharField(default=None, max_length=100, null=True, blank=True)

    council_tax_status = models.SmallIntegerField(default=False, null=True, blank=True)
    council_tax_value = models.FloatField(default=0, null=True, blank=True)
    council_tax_date = models.DateField(default=None, null=True, blank=True)
    council_tax_notes = models.CharField(default=None, max_length=100, null=True, blank=True)

    broadband_status = models.SmallIntegerField(default=False, null=True, blank=True)
    broadband_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    broadband_value = models.FloatField(default=0, null=True, blank=True)
    broadband_date = models.DateField(default=None, null=True, blank=True)
    broadband_notes = models.CharField(default=None, max_length=100, null=True, blank=True)

    sky_status = models.SmallIntegerField(default=False, null=True, blank=True)
    sky_value = models.FloatField(default=0, null=True, blank=True)
    sky_date = models.DateField(default=None, null=True, blank=True)
    sky_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    netflix_status = models.SmallIntegerField(default=False, null=True, blank=True)
    netflix_value = models.FloatField(default=0, null=True, blank=True)
    netflix_date = models.DateField(default=None, null=True, blank=True)
    netflix_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    amazon_status = models.SmallIntegerField(default=False, null=True, blank=True)
    amazon_value = models.FloatField(default=0, null=True, blank=True)
    amazon_date = models.DateField(default=None, null=True, blank=True)
    amazon_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    disney_status = models.SmallIntegerField(default=False, null=True, blank=True)
    disney_value = models.FloatField(default=0, null=True, blank=True)
    disney_date = models.DateField(default=None, null=True, blank=True)
    disney_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    apple_status = models.SmallIntegerField(default=False, null=True, blank=True)
    apple_value = models.FloatField(default=0, null=True, blank=True)
    apple_date = models.DateField(default=None, null=True, blank=True)
    apple_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    phone_status = models.SmallIntegerField(default=False, null=True, blank=True)
    phone_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    phone_value = models.FloatField(default=0, null=True, blank=True)
    phone_date = models.DateField(default=None, null=True, blank=True)
    phone_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    tv_status = models.SmallIntegerField(default=False, null=True, blank=True)
    tv_value = models.FloatField(default=0, null=True, blank=True)
    tv_date = models.DateField(default=None, null=True, blank=True)
    tv_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    gym_status = models.SmallIntegerField(default=False, null=True, blank=True)
    gym_provider = models.CharField(default=None, max_length=50, null=True, blank=True)
    gym_value = models.FloatField(default=0, null=True, blank=True)
    gym_date = models.DateField(default=None, null=True, blank=True)
    gym_notes = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    other_status_1 = models.SmallIntegerField(default=False, null=True, blank=True)
    other_type_1 = models.CharField(default=None, max_length=30, null=True, blank=True)
    other_provider_1 = models.CharField(default=None, max_length=50, null=True, blank=True)
    other_value_1 = models.FloatField(default=0, null=True, blank=True)
    other_date_1 = models.DateField(default=None, null=True, blank=True)
    other_notes_1 = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    other_status_2 = models.SmallIntegerField(default=False, null=True, blank=True)
    other_type_2 = models.CharField(default=None, max_length=30, null=True, blank=True)
    other_provider_2 = models.CharField(default=None, max_length=50, null=True, blank=True)
    other_value_2 = models.FloatField(default=0, null=True, blank=True)
    other_date_2 = models.DateField(default=None, null=True, blank=True)
    other_notes_2 = models.CharField(default=None, max_length=100, null=True, blank=True)
    
    other_status_3 = models.SmallIntegerField(default=False, null=True, blank=True)
    other_type_3 = models.CharField(default=None, max_length=30, null=True, blank=True)
    other_provider_3 = models.CharField(default=None, max_length=50, null=True, blank=True)
    other_value_3 = models.FloatField(default=0, null=True, blank=True)
    other_date_3 = models.DateField(default=None, null=True, blank=True)
    other_notes_3 = models.CharField(default=None, max_length=100, null=True, blank=True)

    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='living_details',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=False,
        # unique=True
    )

