from django.utils import timezone
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from api.models import OneTimePasswords, Usuarios
from api.utils import send_code_to_user
from api.serializers import UserRegisterSerializer, LoginSerializer, ListUsersSerializer, PasswordResetRequestSerializer, SetNewPasswordSerializer, LogoutUserSerializer, ResendOtpSerializer, VerifyEmailSerializer, RolesSerializer
from rest_framework import status, serializers
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ListUsersView(GenericAPIView):
    serializer_class = ListUsersSerializer
    queryset = Usuarios.objects.all()

    def get(self, request):
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
            
            # Llamo la función definida en utils.py para enviar un correo electrónico
            send_code_to_user(usuario['email'])
            return Response({
                'data': usuario,
                'message': f'Se envió un código a su correo electrónico para válidar su cuenta'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyUserEmail(GenericAPIView):
    serializer_class = VerifyEmailSerializer

    def post(self, request):
        try:
            passcode = request.data.get('otp')
            # Obtengo el código OTP y con eso busco en el modelo los datos necesarios
            user_code_obj = OneTimePasswords.objects.get(code=passcode) 
            usuario       = user_code_obj.usuario
            expiration    = user_code_obj.expiration
        
            if timezone.now() > expiration: # Si pasó el tiempo de expiración, devuelvo un 204
                return Response({'message':'El código OTP ha expirado, por favor intentelo de nuevo.'}, status=status.HTTP_204_NO_CONTENT)
            
            if not usuario.is_verified: # Si el usuario no está verificado, lo verifica y devuelve un 200, caso contrario un 204
                usuario.is_verified = True
                usuario.reset_attempts()
                usuario.save()
                return Response({
                    'message': 'El correo electrónico fue verificado exitosamente'
                }, status=status.HTTP_200_OK)
            
            return Response({
                'message': 'El código es inválido, el correo electrónico ya se encuentra verificado'
            }, status=status.HTTP_204_NO_CONTENT) 
        
        except OneTimePasswords.DoesNotExist:
            return Response({'message': 'El código introducido no es válido, por favor intentelo de nuevo'}, status=status.HTTP_404_NOT_FOUND)

class ResendOtp(GenericAPIView): 
    serializer_class = ResendOtpSerializer

    def post(self, request):
        # Como request recibe el email
        user_data   = request.data 
        serializer  = self.serializer_class(data=user_data)
            
        if serializer.is_valid(raise_exception=True):
            user = serializer.data

            # Si el usuario ya está válidado devuelvo un 204
            user_data = Usuarios.objects.get(email=user['email'])
            if user_data.is_verified:
                return Response({'message': 'El correo electrónico ya fue validado'}, status=status.HTTP_204_NO_CONTENT)
            
            # Si el usuario superó los 6 intentos y no pasó el tiempo de espera suficiente, devuelvo un error
            if (user_data.password_reset_attempts > 3 and user_data.enough_time_passed()):
                return Response({'message': 'Se excedieron los intentos disponibles, intente de nuevo más tarde'}, status=status.HTTP_401_UNAUTHORIZED)

            # Elimino el código asociado al usuario en el modelo OTP
            otp_obj = OneTimePasswords.objects.filter(usuario=user_data.id)
            if otp_obj:
                otp_obj.delete()

            # Reenvio código a usuario 
            user_data.increment_reset_attempts()
            send_code_to_user(user['email'])
            return Response({
                'data': user,
                'message':f'Se reenvió el código al correo {user['email']}'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
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
        try:
            serializer = self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            return Response({'message': 'Se envió un link a tu correo electrónico para confirmar el cambio de contraseña'}, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            error_detail = e.detail.get('email', ['Error desconocido'])[0]
            print(str(error_detail))
            return Response({'error': str(error_detail)}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirm(GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user    = Usuarios.objects.filter(id=user_id).first()
            if not user:
                return Response({'message': 'El usuario no existe'}, status=status.HTTP_204_NO_CONTENT)  
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message': 'El token es invalido o expiró'}, status=status.HTTP_401_UNAUTHORIZED)  
            
            return Response({'success':True, 'message':'Las credenciales son válidas', 'uidb64':uidb64, 'token':token}, status=status.HTTP_200_OK)
        
        except DjangoUnicodeDecodeError:
            return Response({'message': 'El token es invalido o expiró'}, status=status.HTTP_401_UNAUTHORIZED)  
        
class SetNewPassword(GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'message':'Se cambió la contraseña exitosamente'}, status=status.HTTP_200_OK)
    
class LogoutUserView(GenericAPIView): 
    serializer_class = LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message':'¡Gracias por utilizar nuestros servicios!'}, status=status.HTTP_200_OK)

class RoleView(GenericAPIView):
    serializer_class = RolesSerializer

    def get(self, request):
        roles = [valor for etiqueta, valor in Usuarios.ROLES]
        serializer = self.serializer_class(data={'roles': roles})
        
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

        
