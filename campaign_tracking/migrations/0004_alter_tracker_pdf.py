# Generated by Django 4.1.5 on 2024-04-02 11:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("campaign_tracking", "0003_alter_tracker_pdf"),
    ]

    operations = [
        migrations.AlterField(
            model_name="tracker",
            name="pdf",
            field=models.CharField(
                blank=True, default=None, max_length=1200, null=True
            ),
        ),
    ]