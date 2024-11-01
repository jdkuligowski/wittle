# Generated by Django 4.1.5 on 2024-02-06 18:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("client_list", "0002_remove_company_hierarchy_alter_company_logo"),
        (
            "epc_favourites",
            "0013_favourite_emails_sent_favourite_letters_sent_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="favourite",
            name="company",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="epc_favourites",
                to="client_list.company",
            ),
        ),
    ]
