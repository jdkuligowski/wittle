# Generated by Django 4.1.5 on 2023-11-05 08:50

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_property_data", "0005_property_date_added_db_property_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="date_added_db",
            field=models.DateField(blank=True, default=None, null=True),
        ),
    ]