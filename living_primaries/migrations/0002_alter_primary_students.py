# Generated by Django 4.1.7 on 2023-03-31 07:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('living_primaries', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='primary',
            name='students',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=4, null=True),
        ),
    ]