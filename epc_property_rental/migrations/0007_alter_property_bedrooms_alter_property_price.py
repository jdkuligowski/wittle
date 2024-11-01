# Generated by Django 4.1.5 on 2023-11-14 13:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_property_rental", "0006_property_added_revised_property_reduced_revised"),
    ]

    operations = [
        migrations.AlterField(
            model_name="property",
            name="bedrooms",
            field=models.FloatField(blank=True, db_index=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name="property",
            name="price",
            field=models.CharField(
                blank=True, db_index=True, default=None, max_length=20, null=True
            ),
        ),
    ]
