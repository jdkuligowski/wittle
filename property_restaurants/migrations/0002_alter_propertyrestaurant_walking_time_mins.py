# Generated by Django 4.1.7 on 2023-04-28 13:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property_restaurants', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertyrestaurant',
            name='walking_time_mins',
            field=models.DecimalField(blank=True, db_index=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
    ]