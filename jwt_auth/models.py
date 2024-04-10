from django.db import models
from django.contrib.auth.models import AbstractUser
from client_list.models import Company
from django.utils import timezone
from django.utils.crypto import get_random_string


# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=50, unique=True, null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    permissions = models.BooleanField(default=True, null=True, blank=True)
    profile_image = models.CharField(max_length=300, blank=True)
    company_name = models.CharField(max_length=100)
    company = models.ForeignKey(
        Company, 
        null=True, 
        blank=True, 
        on_delete=models.SET_NULL
    )


    def save(self, *args, **kwargs):
          if not self.last_login:
              self.last_login = timezone.now()
          if not self.username:
              # Ensure the generated username is unique
              while True:
                  random_username = get_random_string(15)
                  if not User.objects.filter(username=random_username).exists():
                      self.username = random_username
                      break
          super().save(*args, **kwargs)
