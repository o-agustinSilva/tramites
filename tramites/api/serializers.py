from api.models import *
from api.utils import send_normal_email, has_required_age
from django.conf import settings
from django.contrib.auth import authenticate
from django.urls import reverse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_bytes, force_str
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.exceptions import ValidationError

# class ListUsersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Usuarios
#         fields = '__all__'

class DependenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dependence
        fields = ['id ', 'name']

class ListUsersSerializer(serializers.ModelSerializer):
    dependence = serializers.SlugRelatedField(slug_field='name', queryset=Dependence.objects.all(), required=False)
  # campo personalizado para manejar el nombre de la dependencia, en lugar del ID 

    class Meta:
        model = Usuarios
        fields = '__all__'


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    password_confirmation = serializers.CharField(max_length=68, min_length=8, write_only=True)

    class Meta:
        model = Usuarios
        fields = ['email',
                'firstname',
                'lastname',
                'password',
                'password_confirmation',
                'number', 
                'role', 
                'birthdate', 
                'address',
                'address_number',
                'floor',
                'apartment',
                'phone_area_code',
                'phone',
                'document_type',
                'genre',
                'profile_imagen']  
                # se agrega el fields de la imagen de perfil

    def validate(self, attrs):
        password = attrs.get('password', '')
        password_confirmation = attrs.get('password_confirmation', '')
        user_birthdate = attrs.get('birthdate', '')

        # Corrobora que las dos contraseñas (pw and confirm pw) coincidan
        if password != password_confirmation:
            raise serializers.ValidationError("Las contraseñas deben coincidir")
        
        # Corrobora que cumpla la edad minima para realizar un trámite
        if not has_required_age(user_birthdate):
            raise serializers.ValidationError("Debe ser mayor de edad para crear una cuenta")
        
        return attrs
    
    def create(self, validated_data):
        # Creo el usuario y lo guardo en el modelo 
        usuario = Usuarios.objects.create_citizen(
            email = validated_data['email'],
            firstname = validated_data.get('firstname'),
            lastname = validated_data.get('lastname'),
            number = validated_data.get('number'),
            role = validated_data.get('role'),
            birthdate = validated_data.get('birthdate'),
            password = validated_data.get('password'),
            address = validated_data.get('address'),
            address_number = validated_data.get('address_number'),
            floor = validated_data.get('floor'),
            apartment = validated_data.get('apartment'),
            phone_area_code = validated_data.get('phone_area_code'),  
            phone = validated_data.get('phone'),      
            document_type = validated_data.get('document_type'),
            genre = validated_data.get('genre'),
            profile_imagen=validated_data.get('profile_imagen'),
        )
        return usuario

class VerifyEmailSerializer(serializers.Serializer):
    otp = serializers.CharField()

class ResendOtpSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=155, min_length=6)
    
    def validate(self, attrs):
        email = attrs.get('email')
        # Si el usuario existe, continuo con el reenvio del OTP, caso contrario devuelvo un error 
        user = Usuarios.objects.filter(email=email).first()
        if not user:
            raise serializers.ValidationError("No existe el usuario")

        return attrs

class LoginSerializer(serializers.ModelSerializer):
    email         = serializers.EmailField(max_length=155, min_length=6)
    password      = serializers.CharField(max_length=68, write_only=True)
    fullname      = serializers.CharField(max_length=255, read_only=True)
    access_token  = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)
    role          = serializers.CharField(max_length=20, read_only=True)

    class Meta:
        model = Usuarios
        fields = ['email', 'password', 'fullname', 'access_token', 'refresh_token', 'role']

    def validate(self, attrs):
        email       = attrs.get('email')
        password    = attrs.get('password')
        request     = self.context.get('request')


        user = authenticate(request, email=email, password=password)
        if not user: # Si falló la autenticación, el correo o contraseña no son correctos
            raise AuthenticationFailed("El correo electrónico o contraseña no son correctos")
        if not user.is_verified: # Si no falló la autenticación pero el usuario no está verificado
            raise AuthenticationFailed("El correo electrónico no se encuentra verificado")
        
        tokens = user.tokens() # Utilizo la función definida en el modelo para obtener token de acceso y actualización
        return {
            'email':user.email,
            'fullname':user.get_full_name,
            'role':user.role,
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=155, min_length=6)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email   = attrs.get('email')
        user    = Usuarios.objects.filter(email=email).first()

        # Si el usuario no existe, devuelvo error
        if not user:
            raise serializers.ValidationError({"email": "Este correo electrónico no está registrado."})

        # Si superó los intentos máximos permitidos, devuelvo error, va a poder intentar cuando haya pasado un determinado tiempo o cuando haya cambiado la clave
        if (user.password_reset_attempts > 3 and user.enough_time_passed):
            raise serializers.ValidationError({"email": "Se excedieron los intentos disponibles, intente de nuevo más tarde"})

        user.increment_reset_attempts()
        uidb64  = urlsafe_base64_encode(smart_bytes(user.id))
        token   = PasswordResetTokenGenerator().make_token(user)
         
        # Crea el link de cambio de clave
        frontend_base_url   = getattr(settings, 'FRONTEND_BASE_URL', 'http://localhost:8000') 
        abslink = f"{frontend_base_url}/password-reset-confirm/{uidb64}/{token}"

        # Se envia un correo electrónico al usuario
        email_body = f"Para cambiar tu contraseña clickea el siguiente link \n {abslink}"
        data = {
            'email_body': email_body,
            'email_subject': "Cambio de contraseña",
            'to_email': user.email
        }
        print(data)
        # Descomentar una vez implementado el correo con su template
        # send_normal_email(data)
        return super().validate(attrs)

class SetNewPasswordSerializer(serializers.Serializer):
    # Datos necesarios para verificar al usuario que quiere cambiar la contraseña
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    confirm_password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    uidb64  = serializers.CharField(write_only=True)
    token   = serializers.CharField(write_only=True)

    class Meta:
        fields = ['password', 'confirm_password', 'uidb64', 'token']    

    def validate(self, attrs):
        try:
            token       = attrs.get('token')
            uidb64      = attrs.get('uidb64')
            password    = attrs.get('password')
            confirm_password = attrs.get('confirm_password')

            # Considerar verificar la existencia del usuario
            # Verificar que las contraseña nueva no sea coincidente con la antigua
            user_id = force_str(urlsafe_base64_decode(uidb64))
            user    = Usuarios.objects.get(id=user_id) 
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("El link de cambio de clave es inválido o ha expirado", 401)
            if password != confirm_password:
                raise AuthenticationFailed("Las contraseñas deben coincidir")
            
            user.set_password(password)
            user.reset_attempts()
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed("El link de cambio de clave es inválido o ha expirado", 401)

class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    default_error_message = {
        'bad_token': ('El token es inválido o ha expirado')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            raise ValidationError(self.error_messages.get('bad_token', 'El token es inválido o ha expirado'))

class RolesSerializer(serializers.Serializer):
    roles = serializers.ListField(child=serializers.CharField(max_length=15), required=False)

# Trámites y requisitos
class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirements
        fields = ['id', 'name']


# Serializable para rechazar el tramite
class RechazoCaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = ['motivo_rechazo', 'status']  

class UpdateCasePDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = ['archivo_pdf', 'status']  

class TramiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tramite
        fields = '__all__'

class ListRequestedTramitesSerializer(serializers.ModelSerializer):
    archivo_pdf_url = serializers.SerializerMethodField()
    solicitante = ListUsersSerializer()
    usuario_administrador = ListUsersSerializer()
    tramite = TramiteSerializer()

    class Meta:
        model = Cases
        fields = '__all__'
        
    def get_archivo_pdf_url(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.archivo_pdf.url) if obj.archivo_pdf else None
        return None

class RequestTramiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cases
        fields = '__all__'

    
# Dependencias policiales
class DependenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dependence
        fields = '__all__'

# ---SERIALIZABLE DEL USUARIO POLICIA-----
class GetSuperusersSerializer(serializers.ModelSerializer):
    dependence = DependenceSerializer()
    
    class Meta:
        model = Usuarios
        fields = '__all__'

class UserPoliRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    password_confirmation = serializers.CharField(max_length=68, min_length=8, write_only=True)
    is_verified = serializers.BooleanField(default=True)  # Agregar el valor predeterminado aquí


    class Meta:
        model = Usuarios
        fields = ['email', 'number', 'firstname', 'lastname', 'legajo_number','password', 'password_confirmation', 'role', 'address', 'address_number', 'apartment', 'hierarchy', 'dependence', 'is_verified', 'profile_imagen']
                       
    def validate(self, attrs):
        password = attrs.get('password', '')
        password_confirmation = attrs.get('password_confirmation', '')

        # Corrobora que las dos contraseñas (pw and confirm pw) coincidan
        if password != password_confirmation:
            raise serializers.ValidationError("Las contraseñas deben coincidir")
        
        return attrs
    
    def create(self, validated_data):
        # Creo el usuario y lo guardo en el modelo 
        usuario = Usuarios.objects.create_police(
            email=validated_data['email'],
            firstname=validated_data.get('firstname'),
            lastname=validated_data.get('lastname'),
            number=validated_data.get('number'),
            role=validated_data.get('role'),
            password=validated_data.get('password'),
            legajo_number=validated_data.get('legajo_number'),
            address=validated_data.get('address'),
            address_number=validated_data.get('address_number'),
            # floor=validated_data.get('floor'),
            apartment=validated_data.get('apartment'),
            # document_type=validated_data.get('document_type'),
            # genre=validated_data.get('genre'),
            hierarchy=validated_data.get('hierarchy'),
            dependence=validated_data.get('dependence'),
            is_verified=validated_data.get('is_verified', True),
            profile_imagen=validated_data.get('profile_imagen')
        )
        return usuario

class UserPoliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

# Serializable para actulizar el contacto de un usuario
class UpdatePhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['phone_area_code', 'phone']    

# Serializable para actulizar el email de un usuario
class UpdateEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['email']      

# Serializable para actulizar la imagen de un usuario
class UpdatePerfilImaglSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['profile_imagen']     

# Serializable para actulizar la contraseña de un usuario
class UpdatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['password']  # Campo que se puede actualizar

    def update(self, instance, validated_data):
        password = validated_data.get('password')
        if password:
            instance.set_password(password)
            instance.save()
        return instance

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTramite
        fields = '__all__'

# Serializable para actulizar la imagen de un usuario
class UpdatePerfilImaglSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['profile_imagen']  # Campo que se puede actualizar  

# Serializable para actulizar la direccion de un usuario
class UpdateAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['address', 'address_number', 'floor', 'apartment']    


# Serializable para agregar el ID del caso al pago
class UpdateCaseIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTramite
        fields = ['case_id']    


