from api.models import Usuarios
from api.utils import send_normal_email, has_required_age
from django.contrib.auth import authenticate
from django.urls import reverse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import smart_str, smart_bytes, force_str
from django.contrib.sites.shortcuts import get_current_site
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.exceptions import ValidationError

class ListUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    password_confirmation = serializers.CharField(max_length=68, min_length=8, write_only=True)

    class Meta:
        model = Usuarios
        fields = ['email', 'firstname', 'lastname', 'password', 'password_confirmation', 'dni', 'role', 'birthdate', 'address', 'phone']

    def validate(self, attrs):
        password = attrs.get('password', '')
        password_confirmation = attrs.get('password_confirmation', '')
        user_birthdate = attrs.get('birthdate', ''
                                   )
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
            dni = validated_data.get('dni'),
            role = validated_data.get('role'),
            birthdate = validated_data.get('birthdate'),
            password = validated_data.get('password'),
            address = validated_data.get('address'),
            phone = validated_data.get('phone'),
        )
        return usuario

# Serializer definido únicamente para ofrecer interfaz visual por medio del navegador
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

    class Meta:
        model = Usuarios
        fields = ['email', 'password', 'fullname', 'access_token', 'refresh_token']

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
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=155, min_length=6)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        # Si el usuario existe, obtengo los datos necesarios para crear el link de cambio de clave
        if Usuarios.objects.filter(email=email).exists():
            user    = Usuarios.objects.get(email=email) 
            uidb64  = urlsafe_base64_encode(smart_bytes(user.id))
            token   = PasswordResetTokenGenerator().make_token(user)
            request = self.context.get('request')

            current_site    = get_current_site(request).domain
            relative_link   = reverse('password-reset-confirm', kwargs={'uidb64':uidb64, 'token':token})
            abslink = f"http://{current_site}{relative_link}" # Crea el link de cambio de clave

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
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed("El link de cambio de clave es inválido o ha expirado", 401)

class LogoutUserSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()
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
            raise ValidationError(self.error_messages.get('bad_token', 'Token is expired or invalid'))
