# Generated by Django 5.0 on 2024-02-01 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_usuarios_address_alter_usuarios_address_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='phone_area_code',
            field=models.CharField(max_length=7),
        ),
    ]
