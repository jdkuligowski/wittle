# Generated by Django 4.1.5 on 2024-04-01 18:41

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_favourites", "0017_remove_favourite_valuation_booked_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="favourite",
            name="week_removed",
            field=models.DateField(blank=True, default=None, null=True),
        ),
    ]
