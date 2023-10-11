from django.db import models
from django.contrib.auth.models import AbstractUser
from client_list.models import Company
from django.utils import timezone


# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=50, unique=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    permissions = models.BooleanField(default=True, null=True, blank=True)
    profile_image = models.CharField(max_length=300, blank=True)
    company = models.ForeignKey(
        Company, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )


    def save(self, *args, **kwargs):
      if not self.last_login:
          self.last_login = timezone.now()
      super().save(*args, **kwargs)

