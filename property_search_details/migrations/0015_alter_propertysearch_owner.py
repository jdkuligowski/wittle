# Generated by Django 4.1.5 on 2023-02-06 18:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import property_search_details.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('property_search_details', '0014_alter_propertysearch_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertysearch',
            name='owner',
            field=models.ForeignKey(default=property_search_details.models.default_created_by_user, on_delete=django.db.models.deletion.CASCADE, related_name='property_search_details', to=settings.AUTH_USER_MODEL),
        ),
    ]