# Generated by Django 5.1 on 2024-08-30 23:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0053_alter_cases_comprobante_pago_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='paymenttramite',
            old_name='user_id',
            new_name='case_id',
        ),
    ]
