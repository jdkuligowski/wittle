# Generated by Django 4.1.5 on 2023-01-27 11:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('percentiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_bars',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_colleges',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_gyms',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_parks',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_primaries',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_restaurants',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_secondaries',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_supermarkets',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_takeaways',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='all_tubes',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_bars',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_colleges',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_gyms',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_parks',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_primaries',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_restaurants',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_secondaries',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_supermarkets',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_takeaways',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_borough_tubes',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_bars',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_colleges',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_gyms',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_parks',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_primaries',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_restaurants',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_secondaries',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_supermarkets',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_takeaways',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertypercentiles',
            name='london_region_tubes',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
    ]