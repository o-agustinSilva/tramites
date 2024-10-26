# Generated by Django 5.0 on 2023-12-11 23:03

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='police',
            name='dependence',
        ),
        migrations.RemoveField(
            model_name='police',
            name='usuario',
        ),
        migrations.AddField(
            model_name='usuarios',
            name='address',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='dependence',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.dependence'),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='hierarchy',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='phone',
            field=models.CharField(blank=True, max_length=16, null=True),
        ),
        migrations.DeleteModel(
            name='Citizen',
        ),
        migrations.DeleteModel(
            name='Police',
        ),
    ]
