# Generated by Django 5.0 on 2023-12-21 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_onetimepasswords_expiration'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='genre',
            field=models.CharField(choices=[('male', 'Hombre'), ('female', 'Mujer')], default='male', max_length=6),
        ),
        migrations.AddField(
            model_name='usuarios',
            name='type_dni',
            field=models.CharField(choices=[('DNI', 'DNI'), ('LC', 'LC'), ('LE', 'LE'), ('PASAPORTE', 'PASAPORTE'), ('CDI', 'CDI'), ('CUIL', 'CUIL'), ('CUIT', 'CUIT')], default='DNI', max_length=9),
        ),
    ]