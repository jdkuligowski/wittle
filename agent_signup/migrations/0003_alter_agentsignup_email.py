# Generated by Django 4.1.7 on 2023-06-13 13:52

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("agent_signup", "0002_agentsignup_position"),
    ]

    operations = [
        migrations.AlterField(
            model_name="agentsignup",
            name="email",
            field=models.CharField(max_length=100),
        ),
    ]
