# Generated by Django 5.0 on 2024-02-01 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_alter_usuarios_address_number_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='address',
            field=models.CharField(max_length=60),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='address_number',
            field=models.CharField(max_length=10),
        ),
    ]