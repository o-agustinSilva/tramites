# Generated by Django 5.0 on 2023-12-27 22:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_rename_type_dni_usuarios_document_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuarios',
            old_name='dni',
            new_name='number',
        ),
    ]
