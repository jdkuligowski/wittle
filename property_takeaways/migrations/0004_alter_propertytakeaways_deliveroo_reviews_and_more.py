# Generated by Django 4.1.5 on 2023-01-24 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property_takeaways', '0003_remove_propertytakeaways_property_postcode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertytakeaways',
            name='deliveroo_reviews',
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='propertytakeaways',
            name='justEat_reviews',
            field=models.FloatField(blank=True, default=None, null=True),
        ),
    ]