# Generated by Django 4.1.5 on 2023-11-08 19:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_favourites", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="favourite",
            name="bathrooms",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="bedrooms",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="current_epc",
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="date_added_db",
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="let_available_date",
            field=models.CharField(blank=True, default=None, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="market_status",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="potential_epc",
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="price",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="property_type",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name="favourite",
            name="rightmove_id",
            field=models.CharField(
                blank=True, default=None, max_length=20, null=True, unique=True
            ),
        ),
        migrations.AddField(
            model_name="favourite",
            name="url",
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
    ]
