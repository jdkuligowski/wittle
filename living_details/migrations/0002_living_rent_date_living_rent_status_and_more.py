# Generated by Django 4.1.5 on 2023-04-05 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('living_details', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='living',
            name='rent_date',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='living',
            name='rent_status',
            field=models.SmallIntegerField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='living',
            name='rent_value',
            field=models.PositiveIntegerField(blank=True, default=0, null=True),
        ),
    ]