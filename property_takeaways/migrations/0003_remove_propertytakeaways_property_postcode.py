# Generated by Django 4.1.5 on 2023-01-24 09:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('property_takeaways', '0002_propertytakeaways_property_postcode'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='propertytakeaways',
            name='property_postcode',
        ),
    ]