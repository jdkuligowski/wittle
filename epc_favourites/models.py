from django.db import models

# Create your models here.
class Favourite(models.Model):
    postcode = models.CharField(max_length=10, null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    date_added = models.DateField(auto_now_add=True)
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='epc_favourites',
        on_delete=models.CASCADE,
        default=None,
        blank=True,
        null=True
    )

    class Meta:
        unique_together = ['postcode', 'address']