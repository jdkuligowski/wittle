# Generated by Django 4.1.5 on 2024-01-17 10:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("agent_client_details", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="clientdetails",
            name="email",
            field=models.CharField(
                blank=True, default=None, max_length=60, null=True, unique=True
            ),
        ),
    ]
