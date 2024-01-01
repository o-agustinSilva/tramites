# Generated by Django 5.0 on 2023-12-21 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_usuarios_genre_usuarios_type_dni'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='genre',
            field=models.CharField(choices=[('male', 'Hombre'), ('female', 'Mujer')], max_length=6),
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='type_dni',
            field=models.CharField(choices=[('DNI', 'DNI'), ('LC', 'LC'), ('LE', 'LE'), ('PASAPORTE', 'PASAPORTE'), ('CDI', 'CDI'), ('CUIL', 'CUIL'), ('CUIT', 'CUIT')], max_length=9),
        ),
    ]