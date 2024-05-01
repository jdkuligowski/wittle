from django.db import models

# Create your models here.
class Signature(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    company_name = models.CharField(max_length=50, null=True, blank=True)
    title = models.CharField(max_length=50, null=True, blank=True)
    role = models.CharField(max_length=50, null=True, blank=True)
    letter_footer = models.CharField(max_length=200, null=True, blank=True)
    mobile = models.CharField(max_length=50, null=True, blank=True)
    landline = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    email = models.CharField(max_length=200, null=True, blank=True) 
    website = models.CharField(max_length=200, null=True, blank=True) 
    logo = models.CharField(max_length=300, null=True, blank=True) 
    banner_image = models.CharField(max_length=300, null=True, blank=True) 
    digital_signature = models.CharField(max_length=300, null=True, blank=True) 
    instagram = models.CharField(max_length=50, null=True, blank=True)
    tiktok = models.CharField(max_length=50, null=True, blank=True)
    qr_location = models.CharField(max_length=200, null=True, blank=True) 
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='letter_signatures',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )