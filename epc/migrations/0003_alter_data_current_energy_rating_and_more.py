# Generated by Django 4.1.7 on 2023-10-23 20:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc", "0002_alter_data_floor_area"),
    ]

    operations = [
        migrations.AlterField(
            model_name="data",
            name="current_energy_rating",
            field=models.CharField(
                blank=True, db_index=True, default=None, max_length=20, null=True
            ),
        ),
        migrations.AlterField(
            model_name="data",
            name="potential_energy_rating",
            field=models.CharField(
                blank=True, db_index=True, default=None, max_length=20, null=True
            ),
        ),
    ]
