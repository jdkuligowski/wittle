# Generated by Django 4.1.5 on 2024-01-05 14:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        (
            "epc_property_rental",
            "0016_property_current_letter_property_potential_letter",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="features",
            field=models.CharField(
                blank=True, default=None, max_length=1000, null=True
            ),
        ),
    ]