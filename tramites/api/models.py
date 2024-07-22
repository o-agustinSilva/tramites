from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
import secrets
from .manager import UserManager

AUTH_PROVIDERS ={'email':'email', 'google':'google'}

class Usuarios(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ('citizen', 'Ciudadano'),
        ('police', 'Policía'),
        ('admin', 'Administrador')
    )

    GENRES = (
        ('male', 'Hombre'),
        ('female', 'Mujer')
    )

    DOCUMENT_TYPE = (
        ('DNI', 'DNI'),
        ('LC', 'LC'),
        ('LE', 'LE'),
        ('PASAPORTE', 'PASAPORTE'),
        ('CDI', 'CDI'),
        ('CUIL', 'CUIL'),
        ('CUIT', 'CUIT'),
    )

    RANGOS= (
        ('ayudante', 'Ayudante'),
        ('subinspector', 'Subinspector'),
        ('inspector', 'Inspector'),
        ('agente', 'Agente'),
        ('cabo', 'Cabo'),
        ('cabo primero', 'Cabo Primero'),
        ('sargento', 'Sargento'),
        ('sargento primero', 'Sargento Primero'),
    )

    # Campos personalizados
    number       = models.IntegerField()
    document_type = models.CharField(max_length=9, choices=DOCUMENT_TYPE, null=True,   blank=True)
    birthdate = models.DateField(default="2000-06-10")
    profile_imagen = models.ImageField(upload_to='profile_imagen/', null=True,   blank=True, verbose_name=("Profile picture"))
    legajo_number = models.IntegerField()

     # Campos adicionales para ciudadano
    address = models.CharField(max_length=60)
    address_number = models.CharField(max_length=10)
    floor = models.CharField(max_length=10, null=True, blank=True)
    apartment = models.CharField(max_length=10, null=True, blank=True)

    phone_area_code = models.CharField(max_length=7)
    phone   = models.CharField(max_length=16, default="468686")

    # Campos adicionales para policía
    hierarchy   = models.CharField(max_length=30, null=True, blank=True, choices=RANGOS)
    dependence  = models.ForeignKey("Dependence", on_delete=models.CASCADE, null=True, blank=True)

    
    # dependence  = models.CharField(max_length=30, null=True, blank=True)

    
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
    auth_provider   = models.CharField(max_length=50, default=AUTH_PROVIDERS.get("email"))
    genre           = models.CharField(max_length=6, choices=GENRES)
    role = models.CharField(max_length=15, choices=ROLES)

    # Campos para limitar el spam de correos
    password_reset_attempts = models.IntegerField(default=0) 
    last_reset_attempt = models.DateTimeField(null=True, blank=True)

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

    def increment_reset_attempts(self):
        self.password_reset_attempts += 1
        self.last_reset_attempt = timezone.localtime(timezone.now())
        self.save()

    def reset_attempts(self):
        self.password_reset_attempts = 0
        self.last_reset_attempt = None
        self.save()

    def enough_time_passed(self):
        if self.last_reset_attempt is None:
            return True
        
        return ((timezone.localtime(timezone.now()) - self.last_reset_attempt).seconds < 3600)
    
    # Redefino el manager
    objects = UserManager()

class Dependence(models.Model):
    name    = models.CharField(max_length=25, null=False)
    address  = models.CharField(max_length=60, null=False)
    phone   = models.CharField(max_length=16, null=False) 
    tramite = models.ManyToManyField("Tramite", verbose_name="Lista de trámites")
    imagen = models.ImageField(upload_to='imagenDependence/', null=True,   blank=True, verbose_name=("imagen-dependencia"))
    
    def __str__(self):
        return self.name

class Tramite(models.Model):
    name        = models.CharField(unique=True, max_length=30, null=False)    
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
    usuario = models.OneToOneField(Usuarios, on_delete=models.CASCADE)
    
    operation_number    = models.CharField(max_length=15, null=False)
    amount              = models.DecimalField(max_digits=5, decimal_places=2)
    payment_date        = models.DateField(null=False)
    payment_status      = models.CharField(max_length=11, choices=ESTADOS)

    def __str__(self):
        return self.operation_number
    
    def generate_code(self):
        code = ''.join(secrets.choice("0123456789") for _ in range(10))
        return code

class Cases(models.Model):
    ESTADOS = (
        ('solicitado', 'Solicitado'),
        ('en curso', 'En curso'),
        ('resuelto', 'Resuelto'),
        ('rechazado', 'Rechazado'),
        ('pendiente de pago', 'Pendiente de pago')
    )

    ESTADO_CIVIL = (
        ('soltero', 'Soltero/a'),
        ('casado', 'Casado/a'),
        ('divorciado', 'Divorciado/a'),
        ('viudo', 'Viudo/a'),
    )

    OCUPACION = (
        ('empleado', 'Empleado/a'),
        ('desocupado', 'Desocupado/a'),
        ('estudiante', 'Estudiante'),
        ('jubilado', 'Jubilado/a'),
    )

    tramite = models.ForeignKey("Tramite", on_delete=models.CASCADE) 
    solicitante = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name = 'solicitante')
    usuario_administrador = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name = 'administrativo', null=True)
    request_date = models.DateField()
    status = models.CharField(max_length=17, choices=ESTADOS)

    # Permite la carga de documentos
    dni_frente  = models.ImageField(upload_to='media/', null=True)
    dni_dorso   = models.ImageField(upload_to='media/', null=True)
    archivo_pdf = models.FileField(upload_to='documentoPDF/', null=True, blank=True)

    # Nuevo campo para el motivo del rechazo
    motivo_rechazo = models.TextField(blank=True, null=True)  

    # Atributos opcionales - solo para algunos trámites
    nombre_madre        = models.CharField(max_length=100, blank=True)
    madre_vive          = models.BooleanField(blank=True, null=True)
    nombre_padre        = models.CharField(max_length=100, blank=True)
    padre_vive          = models.BooleanField(blank=True, null=True)
    numero_hijos        = models.IntegerField(blank=True, null=True)
    entidad_solicitante = models.CharField(max_length=100, blank=True)
    nacionalidad        = models.CharField(max_length=100, blank=True)
    ocupacion           = models.CharField(max_length=100, blank=True, choices=OCUPACION)
    estado_civil        = models.CharField(max_length=100, blank=True, choices=ESTADO_CIVIL)
    residencia          = models.CharField(max_length=100, blank=True)
    detalle_extravio    = models.CharField(max_length=1024, blank=True)

    # Comprobante de pago y certificado
    comprobante_pago    = models.FileField(upload_to='media/', null=True)
    certificado         = models.FileField(upload_to='media/', null=True)


class Requirements(models.Model): 
    name = models.CharField(max_length=30, null=False)

    def __str__(self):
        return self.name

class OneTimePasswords(models.Model):
    usuario     = models.OneToOneField(Usuarios, on_delete=models.CASCADE)
    code        = models.CharField(max_length=6, unique=True)
    expiration  = models.DateTimeField(null=False)
                                    
    def __str__(self):
        return f"\n{self.usuario.email} - passcode \n{self.expiration}"

# MODELO PARA ALMACENAR LOS PAGOS
class PaymentTramite(models.Model):
    user_id=models.IntegerField()
    transaction_Id=models.CharField(max_length=100, unique=True,  default="0")
    transaction_Amount=models.DecimalField(max_digits=10, decimal_places=2,  default="0.0")
    currency_Id=models.CharField(max_length=10,  default="Unknown")
    status=models.CharField(max_length=50,  default="Unknown")
    status_Detail=models.CharField(max_length=100,  default="Unknown")
    date_Approved=models.DateTimeField(default=timezone.now)
    paymentMethod_Id=models.CharField(max_length=50, default="Unknown")
    cardholder_Name=models.CharField(max_length=100,  default="Unknown")
    last_Four_Digits=models.CharField(max_length=4,  default="0000")
    payer_Email=models.CharField(max_length=50, default="Unknown")
    description=models.CharField(max_length=100, default="Unknown")

    def __str__(self):
        return f'{self.transaction_Id} - {self.status}'



