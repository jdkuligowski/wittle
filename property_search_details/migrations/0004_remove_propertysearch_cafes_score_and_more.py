# Generated by Django 4.1.3 on 2023-01-06 08:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('property_search_details', '0003_propertysearch_search_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='propertysearch',
            name='cafes_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='college_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='friends_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='gym_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='park_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='primary_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='pubs_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='restaurant_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='secondary_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='supermarket_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='takeaway_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='train_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='tube_score',
        ),
        migrations.RemoveField(
            model_name='propertysearch',
            name='workplace_score',
        ),
    ]
