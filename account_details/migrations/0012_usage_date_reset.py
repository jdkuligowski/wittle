# Generated by Django 4.1.5 on 2024-06-12 12:00

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("account_details", "0011_usage_days_left"),
    ]

    operations = [
        migrations.AddField(
            model_name="usage",
            name="date_reset",
            field=models.DateField(blank=True, default=None, null=True),
        ),
    ]