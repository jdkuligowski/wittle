# Generated by Django 4.1.7 on 2023-10-24 10:29

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Property",
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
                    "rightmove_id",
                    models.IntegerField(blank=True, default=None, null=True),
                ),
                (
                    "url",
                    models.CharField(
                        blank=True, default=None, max_length=400, null=True
                    ),
                ),
                (
                    "title",
                    models.CharField(
                        blank=True, default=None, max_length=200, null=True
                    ),
                ),
                (
                    "displayAddress",
                    models.CharField(
                        blank=True, default=None, max_length=200, null=True
                    ),
                ),
                (
                    "bathrooms",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "bedrooms",
                    models.SmallIntegerField(blank=True, default=None, null=True),
                ),
                (
                    "agent",
                    models.CharField(
                        blank=True, default=None, max_length=100, null=True
                    ),
                ),
                (
                    "propertyType",
                    models.CharField(
                        blank=True, default=None, max_length=50, null=True
                    ),
                ),
                (
                    "price",
                    models.CharField(
                        blank=True, default=None, max_length=20, null=True
                    ),
                ),
                (
                    "type",
                    models.CharField(
                        blank=True, default=None, max_length=10, null=True
                    ),
                ),
                (
                    "tenure",
                    models.CharField(
                        blank=True, default=None, max_length=30, null=True
                    ),
                ),
                (
                    "images",
                    models.CharField(
                        blank=True, default=None, max_length=200, null=True
                    ),
                ),
                (
                    "epc",
                    models.CharField(
                        blank=True, default=None, max_length=200, null=True
                    ),
                ),
                (
                    "addedOn",
                    models.CharField(
                        blank=True, default=None, max_length=50, null=True
                    ),
                ),
                ("size", models.FloatField(blank=True, default=None, null=True)),
                ("longitude", models.FloatField(blank=True, default=None, null=True)),
                ("latitude", models.FloatField(blank=True, default=None, null=True)),
                (
                    "postcode",
                    models.CharField(
                        blank=True,
                        db_index=True,
                        default=None,
                        max_length=10,
                        null=True,
                    ),
                ),
            ],
        ),
    ]