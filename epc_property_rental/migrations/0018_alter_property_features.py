# Generated by Django 4.1.5 on 2024-01-05 14:12

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_property_rental", "0017_property_features"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="features",
            field=models.CharField(
                blank=True, default=None, max_length=3000, null=True
            ),
        ),
    ]
