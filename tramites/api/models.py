from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from .manager import UserManager

AUTH_PROVIDERS ={'email':'email', 'google':'google'}

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

     # Campos adicionales para ciudadano
    address = models.CharField(max_length=60, null=True, blank=True)
    phone = models.CharField(max_length=16, null=True, blank=True)

    # Campos adicionales para policía
    hierarchy = models.CharField(max_length=30, null=True, blank=True)
    dependence = models.ForeignKey("Dependence", on_delete=models.CASCADE, null=True, blank=True)

    # Campos necesarios para el modelo User base de django
    email           = models.EmailField(max_length=255, unique=True, verbose_name=("Correo electrónico"))
    firstname       = models.CharField(max_length=100, verbose_name=("Nombre"))
    lastname        = models.CharField(max_length=100, verbose_name=("Apellido"))
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)
    is_verified     = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    date_joined     = models.DateTimeField(auto_now_add=True)
    last_login      = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(max_length=50, default=AUTH_PROVIDERS.get("email"))
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    # Funciones del modelo
    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return f"{self.firstname} {self.lastname}"
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh':str(refresh),
            'access':str(refresh.access_token),
        }

        # Redefino el manager
    objects = UserManager()

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

class OneTimePasswords(models.Model):
    usuario     = models.OneToOneField(Usuarios, on_delete=models.CASCADE)
    code        = models.CharField(max_length=6, unique=True)
    expiration  = models.DateTimeField(null=False)
                                    
    def __str__(self):
        return f"{self.usuario.email}-passcode"