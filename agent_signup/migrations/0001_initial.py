# Generated by Django 4.1.7 on 2023-06-13 13:11

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AgentSignup",
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
                ("email", models.CharField(max_length=100, unique=True)),
                ("name", models.CharField(max_length=50)),
                ("company", models.CharField(max_length=50)),
            ],
        ),
    ]
