# Generated by Django 4.1.5 on 2024-06-12 11:24

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("account_details", "0010_usage_credits_usage_last_payment_date_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="usage",
            name="days_left",
            field=models.SmallIntegerField(blank=True, default=30, null=True),
        ),
    ]
