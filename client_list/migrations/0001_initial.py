# Generated by Django 4.1.7 on 2023-10-04 20:21

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Company",
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
                ("name", models.CharField(max_length=100)),
                ("hierarchy", models.CharField(blank=True, max_length=100)),
                ("logo", models.CharField(blank=True, max_length=100)),
            ],
        ),
    ]
