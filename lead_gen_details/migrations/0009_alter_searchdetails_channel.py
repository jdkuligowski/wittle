# Generated by Django 4.1.5 on 2024-04-24 10:04

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("lead_gen_details", "0008_searchdetails_subcode_alter_searchdetails_postcode"),
    ]

    operations = [
        migrations.AlterField(
            model_name="searchdetails",
            name="channel",
            field=models.CharField(
                blank=True, default="Both", max_length=10, null=True
            ),
        ),
    ]