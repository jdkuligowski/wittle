# Generated by Django 4.1.5 on 2024-01-03 16:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_property_data", "0014_alter_property_size"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="subcode",
            field=models.CharField(
                blank=True, db_index=True, default=None, max_length=10, null=True
            ),
        ),
    ]
