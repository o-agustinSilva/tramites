# Generated by Django 5.0.4 on 2024-06-30 03:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0046_alter_usuarios_dependence'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='dependence',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.dependence'),
        ),
    ]
