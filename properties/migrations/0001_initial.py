# Generated by Django 4.1.3 on 2023-01-03 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_name', models.CharField(default=None, max_length=250)),
                ('property_description', models.CharField(default=None, max_length=5000)),
                ('property_image_1', models.CharField(default=None, max_length=250)),
                ('property_image_2', models.CharField(default=None, max_length=250)),
                ('type', models.CharField(default=None, max_length=250)),
                ('bedrooms', models.PositiveIntegerField(default=None)),
                ('value', models.PositiveIntegerField(default=None)),
                ('floorplan', models.CharField(default=None, max_length=250)),
                ('long', models.FloatField(default=None)),
                ('Lat', models.FloatField(default=None)),
                ('estate_agent', models.CharField(default=None, max_length=250)),
                ('estate_agent_number', models.CharField(default=None, max_length=250)),
            ],
        ),
    ]
