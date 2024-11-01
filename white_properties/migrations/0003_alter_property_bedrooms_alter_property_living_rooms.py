# Generated by Django 4.1.7 on 2023-10-03 20:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("white_properties", "0002_alter_property_bathrooms"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="bedrooms",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name="property",
            name="living_rooms",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
    ]
