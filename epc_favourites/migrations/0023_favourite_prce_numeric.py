# Generated by Django 4.1.5 on 2024-04-09 08:19

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_favourites", "0022_rename_tracking_favourite_live_tracking"),
    ]

    operations = [
        migrations.AddField(
            model_name="favourite",
            name="prce_numeric",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
    ]