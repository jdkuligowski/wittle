# Generated by Django 4.1.3 on 2022-11-08 09:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('areas', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='area',
            name='area_postcode',
            field=models.CharField(default=None, max_length=10, unique=True),
        ),
    ]
