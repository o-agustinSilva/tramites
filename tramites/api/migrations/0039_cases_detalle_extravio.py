# Generated by Django 5.0 on 2024-05-07 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_cases_estado_civil_cases_nacionalidad_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cases',
            name='detalle_extravio',
            field=models.CharField(blank=True, max_length=1024),
        ),
    ]