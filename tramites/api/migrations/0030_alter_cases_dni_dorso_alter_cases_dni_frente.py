# Generated by Django 5.0 on 2024-02-15 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_alter_cases_dni_dorso_alter_cases_dni_frente'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cases',
            name='dni_dorso',
            field=models.FileField(blank=True, default='a', null=True, upload_to='documents/'),
        ),
        migrations.AlterField(
            model_name='cases',
            name='dni_frente',
            field=models.FileField(blank=True, default='a', null=True, upload_to='documents/'),
        ),
    ]