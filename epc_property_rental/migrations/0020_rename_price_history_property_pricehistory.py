# Generated by Django 4.1.5 on 2024-01-08 10:30

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("epc_property_rental", "0019_property_price_history"),
    ]

    operations = [
        migrations.RenameField(
            model_name="property",
            old_name="price_history",
            new_name="priceHistory",
        ),
    ]
