# Generated by Django 4.1.5 on 2024-01-13 14:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("postcode_personas", "0003_rename_lsoa_personadetails_district_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="personadetails",
            name="crime_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="ev_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="gym_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="park_area_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="play_area_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="primary_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="pub_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="restaurant_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="secondary_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name="personadetails",
            name="tube_percentile",
            field=models.FloatField(blank=True, default=None, null=True),
        ),
    ]
