# Generated by Django 4.1.5 on 2023-11-14 20:37

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("epc_favourites", "0009_favourite_action"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="favourite",
            unique_together={("rightmove_id", "owner")},
        ),
    ]
