# Generated by Django 4.1.5 on 2024-01-17 18:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("agent_search_searches", "0002_alter_agentsearches_size"),
    ]

    operations = [
        migrations.AlterField(
            model_name="agentsearches",
            name="size",
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
