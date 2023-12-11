from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.hashers import make_password
from .manager import CitizenManager, PoliceManager

class Usuarios(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ('citizen', 'Ciudadano'),
        ('police', 'Policía'),
        ('administrator', 'Administrador')
    )

    # Campos personalizados
    dni       = models.IntegerField()
    role      = models.CharField(max_length=13, choices=ROLES)
    birthdate = models.DateField(default="2000-06-10")

    # Campos necesarios para el modelo User base de django
    email           = models.EmailField(max_length=255, unique=True, verbose_name=("Correo electrónico"))
    firstname       = models.CharField(max_length=100, verbose_name=("Nombre"))
    lastname        = models.CharField(max_length=100, verbose_name=("Apellido"))
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)
    is_verified     = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=False)
    date_joined     = models.DateTimeField(auto_now_add=True)
    last_login      = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["firstname", "lastname"]

    # Funciones del modelo
    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.firstname} {self.lastname}"
    
    def tokens(self):
        pass

class Citizen(models.Model):
    usuario = models.OneToOneField(Usuarios, on_delete=models.CASCADE, primary_key=True, default=1)
    address = models.CharField(max_length=60, null=False)
    phone = models.CharField(max_length=16, null=False)

    # Redefino el manager
    objects = CitizenManager()

class Police(models.Model):
    usuario = models.OneToOneField(Usuarios, on_delete=models.CASCADE, primary_key=True, default=1)
    hierarchy   = models.CharField(max_length=30, null=False)
    dependence  = models.ForeignKey("Dependence", on_delete=models.CASCADE)

    # Redefino el manager
    objects = PoliceManager()

class Dependence(models.Model):
    name    = models.CharField(max_length=25, null=False)
    adress  = models.CharField(max_length=60, null=False)
    phone   = models.CharField(max_length=16, null=False) 
    tramite = models.ManyToManyField("Tramite", verbose_name="Lista de trámites")

    def __str__(self):
        return self.name

class Tramite(models.Model):
    name        = models.CharField(max_length=30, null=False)    
    description = models.CharField(max_length=200, null=False)
    price       = models.CharField(max_length=30, null=False)
    time_limit  = models.IntegerField(null=False) # in days
    requirement = models.ManyToManyField("Requirements", verbose_name="Lista de requerimientos")

    def __str__(self):
        return self.name

class Payment(models.Model):
    ESTADOS = (
        ('pending', 'Pendiente'),
        ('processed', 'Procesado'),
        ('rejected', 'Rechazado'),
        ('refunded', 'Reintegrado')
    )

    tramite = models.ForeignKey("Tramite", on_delete=models.CASCADE) 
    usuario = models.OneToOneField(Usuarios, on_delete=models.CASCADE, default=1)
    
    operation_number    = models.CharField(max_length=15, null=False)
    amount              = models.DecimalField(max_digits=5, decimal_places=2)
    payment_date        = models.DateField(null=False)
    payment_status      = models.CharField(max_length=11, choices=ESTADOS)

    def __str__(self):
        return self.operation_number

class Requirements(models.Model): 
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name
