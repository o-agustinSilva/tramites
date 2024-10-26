# Generated by Django 5.0 on 2023-12-11 22:27

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('dni', models.IntegerField()),
                ('role', models.CharField(choices=[('citizen', 'Ciudadano'), ('police', 'Policía'), ('administrator', 'Administrador')], max_length=13)),
                ('birthdate', models.DateField(default='2000-06-10')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='Correo electrónico')),
                ('firstname', models.CharField(max_length=100, verbose_name='Nombre')),
                ('lastname', models.CharField(max_length=100, verbose_name='Apellido')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_verified', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('last_login', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Requirements',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Citizen',
            fields=[
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('address', models.CharField(max_length=60)),
                ('phone', models.CharField(max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='OneTimePasswords',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CODE', models.CharField(max_length=6, unique=True)),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tramite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=200)),
                ('price', models.CharField(max_length=30)),
                ('time_limit', models.IntegerField()),
                ('requirement', models.ManyToManyField(to='api.requirements', verbose_name='Lista de requerimientos')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operation_number', models.CharField(max_length=15)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=5)),
                ('payment_date', models.DateField()),
                ('payment_status', models.CharField(choices=[('pending', 'Pendiente'), ('processed', 'Procesado'), ('rejected', 'Rechazado'), ('refunded', 'Reintegrado')], max_length=11)),
                ('usuario', models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tramite', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.tramite')),
            ],
        ),
        migrations.CreateModel(
            name='Dependence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('adress', models.CharField(max_length=60)),
                ('phone', models.CharField(max_length=16)),
                ('tramite', models.ManyToManyField(to='api.tramite', verbose_name='Lista de trámites')),
            ],
        ),
        migrations.CreateModel(
            name='Police',
            fields=[
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('hierarchy', models.CharField(max_length=30)),
                ('dependence', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.dependence')),
            ],
        ),
    ]
