# Generated by Django 4.1.5 on 2023-11-09 12:56

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_favourites", "0002_favourite_bathrooms_favourite_bedrooms_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="favourite",
            name="channel",
            field=models.CharField(
                blank=True, default=None, max_length=20, null=True, unique=True
            ),
        ),
    ]
