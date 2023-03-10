# Generated by Django 4.1.3 on 2022-11-08 09:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('areas', '0002_alter_area_area_postcode'),
    ]

    operations = [
        migrations.CreateModel(
            name='Primary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_id', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('local_authority', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('school_name', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('town', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('postcode', models.CharField(blank=True, default=None, max_length=10, null=True)),
                ('postcode_area', models.CharField(blank=True, default=None, max_length=6, null=True)),
                ('school_grouping', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('gender', models.CharField(blank=True, default=None, max_length=50, null=True)),
                ('religious_grouping', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('ofsted_results', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('ofsted_recency', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('alternative_ofsted', models.CharField(blank=True, default=None, max_length=100, null=True)),
                ('student_number', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('POI_long', models.FloatField(blank=True, default=None, null=True)),
                ('POI_lat', models.FloatField(blank=True, default=None, null=True)),
                ('area_ref', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='primaries', to='areas.area', to_field='area_postcode')),
            ],
        ),
    ]
