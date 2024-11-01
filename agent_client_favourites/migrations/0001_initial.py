# Generated by Django 4.1.5 on 2024-01-17 13:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("agent_client_details", "0004_alter_clientdetails_date_onboarded"),
    ]

    operations = [
        migrations.CreateModel(
            name="ClientFavourites",
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
                    models.CharField(
                        blank=True, default=None, max_length=20, null=True, unique=True
                    ),
                ),
                (
                    "url",
                    models.CharField(
                        blank=True, default=None, max_length=400, null=True
                    ),
                ),
                (
                    "displayAddress",
                    models.CharField(
                        blank=True, default=None, max_length=200, null=True
                    ),
                ),
                ("bathrooms", models.FloatField(blank=True, default=None, null=True)),
                ("bedrooms", models.FloatField(blank=True, default=None, null=True)),
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
                    "price_numeric",
                    models.FloatField(
                        blank=True, db_index=True, default=None, null=True
                    ),
                ),
                (
                    "images",
                    models.CharField(
                        blank=True, default=None, max_length=200, null=True
                    ),
                ),
                (
                    "score",
                    models.FloatField(
                        blank=True, db_index=True, default=None, null=True
                    ),
                ),
                (
                    "channel",
                    models.CharField(
                        blank=True, default=None, max_length=10, null=True
                    ),
                ),
                (
                    "client",
                    models.ForeignKey(
                        blank=True,
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="client_saved_properties",
                        to="agent_client_details.clientdetails",
                    ),
                ),
            ],
        ),
    ]
