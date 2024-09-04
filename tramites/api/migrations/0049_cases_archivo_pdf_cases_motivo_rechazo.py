# Generated by Django 5.0.4 on 2024-07-11 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0048_dependence_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='cases',
            name='archivo_pdf',
            field=models.FileField(blank=True, null=True, upload_to='docuemntoPDF/'),
        ),
        migrations.AddField(
            model_name='cases',
            name='motivo_rechazo',
            field=models.TextField(blank=True, null=True),
        ),
    ]