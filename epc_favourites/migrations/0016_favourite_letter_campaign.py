# Generated by Django 4.1.5 on 2024-03-26 19:24

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_favourites", "0015_favourite_letter_sequence"),
    ]

    operations = [
        migrations.AddField(
            model_name="favourite",
            name="letter_campaign",
            field=models.CharField(
                blank=True, default="None", max_length=20, null=True
            ),
        ),
    ]