# Generated by Django 5.0.2 on 2024-03-01 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_cases_entidad_solicitante_cases_madre_vive_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='birthdate',
            field=models.DateField(default='2000-06-10'),
        ),
    ]
