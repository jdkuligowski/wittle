# Generated by Django 4.1.5 on 2023-01-26 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property_secondaries', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='propertysecondary',
            name='adjusted_dist_km',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='propertysecondary',
            name='gender_value',
            field=models.SmallIntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='propertysecondary',
            name='ofsted_recency_value',
            field=models.SmallIntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='propertysecondary',
            name='ofsted_value',
            field=models.SmallIntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='propertysecondary',
            name='religion_value',
            field=models.SmallIntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='propertysecondary',
            name='walking_time_mins',
            field=models.DecimalField(blank=True, decimal_places=1, default=None, max_digits=3, null=True),
        ),
    ]