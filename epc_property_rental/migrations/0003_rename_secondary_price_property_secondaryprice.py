# Generated by Django 4.1.5 on 2023-11-05 17:52

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        (
            "epc_property_rental",
            "0002_alter_property_furnish_type_alter_property_let_type",
        ),
    ]

    operations = [
        migrations.RenameField(
            model_name="property",
            old_name="secondary_price",
            new_name="secondaryPrice",
        ),
    ]