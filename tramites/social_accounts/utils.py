from django.contrib.auth import authenticate
from django.conf import settings
from api.models import Usuarios
from rest_framework.exceptions import AuthenticationFailed
from google.auth.transport import requests
from google.oauth2 import id_token

class Google():
    @staticmethod
    def validate(access_token):
        try:
            id_info = id_token.verify_oauth2_token(access_token, requests.Request())
            if "accounts.google.com" in id_info['iss']: # Si recibimos una cuenta de google
                return id_info
        except Exception as e:
            return "El token es inválido o ha expirado"

def login_social_user(email, password):
    user = authenticate(email=email, password=password)
    tokens = user.tokens() # Utilizo la función definida en el modelo para obtener token de acceso y actualización
    return {
        'email':user.email,
        'fullname':user.get_full_name,
        "access_token":str(tokens.get('access')),
        "refresh_token":str(tokens.get('refresh'))
    }

def register_social_user(provider, email, firstname, lastname, **extra_fields):
    user = Usuarios.objects.filter(email=email)
    if user.exists():
        if provider == user[0].auth_provider:
            login_social_user(email, settings.SOCIAL_AUTH_PASSWORD)
        else:
            raise AuthenticationFailed(
                detail=f"Por favor continuar su logueo con {user[0].auth_provider}"
            )
    else:
        new_user = { # Si el usuario no existe, lo creo
            'email': email,
            'firstname': firstname,
            'lastname': lastname,
            'dni': extra_fields.get('dni'),
            'role': extra_fields.get('role'),
            'birthdate': extra_fields.get('birthdate'),
            'password': extra_fields.get('password'),
            'address': extra_fields.get('address'),
            'phone': extra_fields.get('phone'),
        } 
        register_user = Usuarios.objects.create_citizen(**new_user)
        register_user.auth_provider = provider
        register_user.is_verified = True
        register_user.save()
        login_social_user(email=register_user.email, password=settings.SOCIAL_AUTH_PASSWORD)