# Generated by Django 5.0 on 2023-12-14 22:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_usuarios_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='auth_provider',
            field=models.CharField(default='email', max_length=50),
        ),
    ]