# Generated by Django 4.1.5 on 2023-01-23 14:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('properties', '0003_property_tenure'),
    ]

    operations = [
        migrations.CreateModel(
            name='PropertyPercentiles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('property_id', models.PositiveIntegerField(blank=True, default=None)),
                ('property_name', models.CharField(blank=True, default=None, max_length=250, null=True)),
                ('prop_long', models.FloatField(blank=True, default=None, null=True)),
                ('prop_lat', models.FloatField(blank=True, default=None, null=True)),
                ('postcode_district', models.CharField(blank=True, default=None, max_length=5, null=True)),
                ('overall_area', models.CharField(blank=True, default=None, max_length=20, null=True)),
                ('restaurant_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_restaurants', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_restaurants', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_restaurants', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('bar_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_bars', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_bars', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_bars', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('takeaway_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_takeaways', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_takeaways', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_takeaways', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('gym_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_gyms', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_gyms', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_gyms', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('tube_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_tubes', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_tubes', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_tubes', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('park_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_parks', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_parks', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_parks', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('supermarket_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_supermarkets', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_supermarkets', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_supermarkets', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('primary_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_primariess', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_primariess', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_primariess', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('secondary_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_secondariess', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_secondariess', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_secondariess', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('college_score', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('all_colleges', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_borough_colleges', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('london_region_colleges', models.PositiveIntegerField(blank=True, default=None, null=True)),
                ('property_ref', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='percentiles', to='properties.property')),
            ],
        ),
    ]