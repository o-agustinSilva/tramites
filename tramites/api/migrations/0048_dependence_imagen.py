# Generated by Django 5.0.4 on 2024-07-11 19:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0047_alter_usuarios_dependence'),
    ]

    operations = [
        migrations.AddField(
            model_name='dependence',
            name='imagen',
            field=models.ImageField(blank=True, null=True, upload_to='imagenDependence/', verbose_name='imagen-dependencia'),
        ),
    ]
