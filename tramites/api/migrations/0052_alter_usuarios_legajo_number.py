# Generated by Django 5.1 on 2024-08-22 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0051_cases_observacion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='legajo_number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
