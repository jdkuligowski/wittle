# Generated by Django 4.1.5 on 2023-11-07 13:48

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_property_rental", "0003_rename_secondary_price_property_secondaryprice"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="current_epc",
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="property",
            name="potential_epc",
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]