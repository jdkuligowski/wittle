from django.db import models

class Branches(models.Model):
    branch_name = models.CharField(max_length=100, unique=True)
