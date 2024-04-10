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
    sender_name = models.FloatField(default=None, null=True, blank=True)
    sender_company = models.FloatField(default=None, null=True, blank=True)
    sender_role = models.FloatField(default=None, null=True, blank=True)
    sender_mobile = models.FloatField(default=None, null=True, blank=True)
    sender_landline = models.FloatField(default=None, null=True, blank=True)
    sender_email = models.FloatField(default=None, null=True, blank=True)
    sender_footer = models.FloatField(default=None, null=True, blank=True)
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