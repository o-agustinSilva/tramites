# Generated by Django 5.0 on 2024-02-04 02:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_alter_tramite_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dependence',
            old_name='adress',
            new_name='address',
        ),
        migrations.AlterField(
            model_name='usuarios',
            name='hierarchy',
            field=models.CharField(blank=True, choices=[('citizen', 'Ciudadano'), ('police', 'Policía'), ('admin', 'Administrador')], max_length=30, null=True),
        ),
    ]
