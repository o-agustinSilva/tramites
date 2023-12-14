from urllib import response
from django.shortcuts import render
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from api.models import OneTimePasswords, Usuarios
from api.utils import send_code_to_user
from api.serializers import UserRegisterSerializer, LoginSerializer, ListUsersSerializer, PasswordResetRequestSerializer, SetNewPasswordSerializer
from rest_framework import status, serializers
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class ListUsersView(GenericAPIView):
    serializer_class = ListUsersSerializer
    queryset = Usuarios.objects.all()

    def get(self, request, *args, **kwargs):
        # Tu lógica de manejo de la solicitud GET aquí
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            usuario = serializer.data
            
            # Función para enviar un correo
            send_code_to_user(usuario['email'])

            return Response({
                'data': usuario,
                'message': f'Gracias por utilizar nuestros servicios, se envio un código'
            }, status=status.HTTP_201_CREATED)

        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        try:
            passcode = request.data.get('otp')
            user_code_obj = OneTimePasswords.objects.get(code=passcode) 
            usuario = user_code_obj.usuario
            if not usuario.is_verified: # Si el usuario no está verificado, lo verifica y devuelve un 200, caso contrario un 204
                usuario.is_verified = True
                usuario.save()
                return Response({
                    'message': 'account email verified successfully'
                }, status=status.HTTP_200_OK)
            
            return Response({
                'message': 'code is invalid, user already verified'
            }, status=status.HTTP_204_NO_CONTENT) 
        
        except OneTimePasswords.DoesNotExist:
            return Response({'message': 'passcode not provided'}, status=status.HTTP_404_NOT_FOUND)

class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer= self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TestAuthenticationView(GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        data = {
            'msg': 'Token válido'
        }
        return Response(data, status=status.HTTP_200_OK)
    
class PasswordResetRequestView(GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'Se envió un link para confirmar el cambio de tu contraseña'}, status=status.HTTP_200_OK)

class PasswordResetConfirm(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = Usuarios.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message': 'El token es invalido o expiró'}, status=status.HTTP_401_UNAUTHORIZED)  
            return Response({'sucess':True, 'message':'Las credenciales son validas', 'uidb65':uidb64, 'token':token}, status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError:
            return Response({'message': 'El token es invalido o expiró'}, status=status.HTTP_401_UNAUTHORIZED)  
        
class SetNewPassword(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'message':'Se cambió la contraseña exitosamente'}, status=status.HTTP_200_OK)