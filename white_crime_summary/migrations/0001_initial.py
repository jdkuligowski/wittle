# Generated by Django 4.1.7 on 2023-07-06 16:03

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Crime",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "lsoa_name",
                    models.CharField(
                        blank=True, default=None, max_length=50, null=True
                    ),
                ),
                (
                    "borough",
                    models.CharField(
                        blank=True, default=None, max_length=30, null=True
                    ),
                ),
                (
                    "anti_social_behaviour",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "bicycle_theft",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "burglary",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "criminal_damage_arson",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "drugs",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "other_crime",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "other_theft",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "possession_of_weapons",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "public_order",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "robbery",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "shoplifting",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "theft_person",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "vehicle_crime",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "violence_sexual_assault",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                ("total", models.IntegerField(blank=True, default=None, null=True)),
                ("percentile", models.FloatField(blank=True, default=None, null=True)),
                (
                    "area_total",
                    models.IntegerField(blank=True, default=None, null=True),
                ),
                (
                    "overall_area_percentile",
                    models.FloatField(blank=True, default=None, null=True),
                ),
                (
                    "area_specific_percentile",
                    models.FloatField(blank=True, default=None, null=True),
                ),
            ],
        ),
    ]
