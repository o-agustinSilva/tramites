# Generated by Django 5.0 on 2024-02-02 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_alter_usuarios_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tramite',
            name='name',
            field=models.CharField(max_length=30, unique=True),
        ),
    ]
