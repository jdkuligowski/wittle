from django.db import models

# Create your models here.
class Favourite(models.Model):
    postcode = models.CharField(max_length=10, null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)
    category = models.CharField(max_length=100, null=True, blank=True)
    market_status = models.CharField(max_length=50, null=True, blank=True)
    property_type = models.CharField(max_length=50, null=True, blank=True)
    price = models.CharField(max_length=20, null=True, blank=True)
    bathrooms = models.FloatField(default=None, null=True, blank=True)
    bedrooms = models.FloatField(default=None, null=True, blank=True)   
    let_available_date = models.CharField(default=None, max_length=15, null=True, blank=True)
    date_added_db = models.DateField(default=None, null=True, blank=True)
    rightmove_id = models.CharField(default=None, max_length=20, null=True, blank=True, unique=True)
    url = models.CharField(default=None, max_length=400, null=True, blank=True)
    current_epc = models.IntegerField(default=None, null=True, blank=True)
    potential_epc = models.IntegerField(default=None, null=True, blank=True)
    channel = models.CharField(default=None, max_length=20, null=True, blank=True)
    agent = models.CharField(default=None, max_length=250, null=True, blank=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='epc_favourites',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )



    # class Meta:
    #     unique_together = ['postcode', 'address']