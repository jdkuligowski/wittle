# Generated by Django 4.1.5 on 2023-11-10 14:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("epc_favourites", "0006_alter_favourite_agent"),
    ]

    operations = [
        migrations.AlterField(
            model_name="favourite",
            name="agent",
            field=models.CharField(blank=True, default=None, max_length=250, null=True),
        ),
    ]