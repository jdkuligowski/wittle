from django.db import models

# Create your models here.
class Templates(models.Model):
    template_number = models.FloatField(default=None, null=True, blank=True)
    template_name = models.CharField(max_length=50, unique=True)
    template_body_1 = models.CharField(max_length=1200, null=True, blank=True)
    template_body_2 = models.CharField(max_length=1200, null=True, blank=True)
    template_body_3 = models.CharField(max_length=1200, null=True, blank=True)
    template_body_4 = models.CharField(max_length=1200, null=True, blank=True)
    template_body_5 = models.CharField(max_length=1200, null=True, blank=True)
    template_type = models.CharField(max_length=20, null=True, blank=True)
    sender_name = models.BooleanField(default=False)
    sender_company = models.BooleanField(default=False)
    sender_role = models.BooleanField(default=False)
    sender_mobile = models.BooleanField(default=False)
    sender_landline = models.BooleanField(default=False)
    sender_email = models.BooleanField(default=False)
    sender_website = models.BooleanField(default=False)
    sender_footer = models.BooleanField(default=False)
    logo_width = models.FloatField(default=None, null=True, blank=True)
    logo_height = models.FloatField(default=None, null=True, blank=True)
    logo_position = models.CharField(max_length=10, null=True, blank=True)
    opening = models.CharField(max_length=40, null=True, blank=True)
    closing = models.CharField(max_length=40, null=True, blank=True)
    example_pdf = models.CharField(max_length=400, null=True, blank=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='letter_templates',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )