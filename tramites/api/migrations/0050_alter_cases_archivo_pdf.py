# Generated by Django 5.0.4 on 2024-07-12 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0049_cases_archivo_pdf_cases_motivo_rechazo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cases',
            name='archivo_pdf',
            field=models.FileField(blank=True, null=True, upload_to='documentoPDF/'),
        ),
    ]
