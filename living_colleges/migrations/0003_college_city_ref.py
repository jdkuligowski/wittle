# Generated by Django 4.1.5 on 2023-03-31 12:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('living_master', '0001_initial'),
        ('living_colleges', '0002_alter_college_students'),
    ]

    operations = [
        migrations.AddField(
            model_name='college',
            name='city_ref',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='colleges', to='living_master.city'),
        ),
    ]