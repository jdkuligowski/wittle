# Generated by Django 4.1.5 on 2024-01-03 12:41

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("account_details", "0004_alter_usage_last_login"),
    ]

    operations = [
        migrations.AlterField(
            model_name="usage",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="usage",
            name="last_login",
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name="usage",
            name="total_logins",
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
