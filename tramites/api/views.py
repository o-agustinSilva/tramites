from django.utils import timezone
from django.db.models import Q
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from api.models import OneTimePasswords, Usuarios, Requirements, Tramite, Dependence
from api.utils import send_code_to_user
from api.serializers import *
from rest_framework import status, serializers
from rest_framework.generics import GenericAPIView, DestroyAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

#userPoli
from api.serializers import UserPoliRegisterSerializer;

# ======================================
#         Views de usuarios
#=======================================

class ListUsersView(GenericAPIView):
    serializer_class = ListUsersSerializer
    queryset = Usuarios.objects.all()
    
    def get(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class GetUserView(RetrieveAPIView):
    serializer_class = ListUsersSerializer
    queryset = Usuarios.objects.all()
    lookup_url_kwarg = 'pk'

class UserDetailsView(GenericAPIView):
    serializer_class = ListUsersSerializer
    lookup_field = 'email'

    def get(self, request, *args, **kwargs):
        email = self.kwargs.get(self.lookup_field)
        queryset = Usuarios.objects.filter(email=email).first()

        if queryset is not None:  # Verificar si se encontró un usuario
            serializer = self.serializer_class(queryset)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

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
        print(serializer.data)
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





# ======================================
#      Views de trámites/requisitos
#=======================================
        
class CreateRequirementView(GenericAPIView):
    serializer_class = RequirementSerializer; 
    
    def post(self, request, *args, **kwargs):
        serializers = self.serializer_class(data=request.data)
        
        if serializers.is_valid(raise_exception=True):
            # Creo y guardo el requisito
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class GetRequirementsView(GenericAPIView):
    serializer_class = RequirementSerializer; 
    queryset = Requirements.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeleteRequirementView(DestroyAPIView):
    queryset = Requirements.objects.all()
    serializer_class = RequirementSerializer
    lookup_url_kwarg = 'pk'  # Nombre del parámetro en la URL que indica el ID del requisito a eliminar
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "El requisito ha sido eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)
    
class CreateTramiteView(GenericAPIView):
    serializer_class = TramiteSerializer

    def post(self, request, *args, **kwargs):
        serializers = self.serializer_class(data=request.data)
        
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

class ListTramites(GenericAPIView):
    serializer_class = TramiteSerializer
    queryset = Tramite.objects.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetTramiteView(RetrieveAPIView):
    serializer_class = TramiteSerializer
    queryset = Tramite.objects.all()
    lookup_url_kwarg = 'pk'

class DeleteTramiteView(DestroyAPIView):
    queryset = Tramite.objects.all()
    serializer_class = TramiteSerializer
    lookup_url_kwarg = 'pk'  # Nombre del parámetro en la URL que indica el ID del requisito a eliminar
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "El trámite ha sido eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)

class UpdateTramiteView(UpdateAPIView):
    serializer_class = TramiteSerializer
    queryset = Tramite.objects.all()
    lookup_url_kwarg = 'pk'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ======================================
#           Views de casos
#=======================================
class RequestTramiteView(GenericAPIView):
    serializer_class = RequestTramiteSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListCasesView(GenericAPIView):
    serializer_class = ListRequestedTramitesSerializer
    queryset = Cases.objects.all()

    def get(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetCaseView(RetrieveAPIView):
    serializer_class = ListRequestedTramitesSerializer
    queryset = Cases.objects.all()
    lookup_url_kwarg = 'pk'

class FilterCasesView(GenericAPIView):
    serializer_class = ListRequestedTramitesSerializer
    lookup_url_kwarg = 'filter'
    
    def get_queryset(self):
        filter_value = self.kwargs.get(self.lookup_url_kwarg)
        filter_value = filter_value.replace("-", " ") # Por si el estado es "En curso"
        return Cases.objects.filter(status=filter_value)
    
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FilterCasesByUserAndStatusView(GenericAPIView):
    serializer_class = ListRequestedTramitesSerializer

    def get(self, request, user_id, status):
        status = status.replace("-", " ")
        queryset = Cases.objects.filter(solicitante=user_id, status=status)
            
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class GetPendingCasesView(GenericAPIView):
    serializer_class = ListRequestedTramitesSerializer

    def get(self, request, user_id):
        queryset = Cases.objects.filter(solicitante=user_id, status__in=['solicitado', 'en curso'])
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetCompletedCasesView(GenericAPIView):
    serializer_class = ListRequestedTramitesSerializer
    
    def get(self, request, user_id):
        queryset = Cases.objects.filter(solicitante=user_id, status__in=['resuelto', 'rechazado'])
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateCaseView(UpdateAPIView):
    serializer_class = RequestTramiteSerializer
    queryset = Cases.objects.all()
    lookup_url_kwarg = 'pk'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteCaseView(DestroyAPIView):
    queryset = Cases.objects.all()
    serializer_class = RequestTramiteSerializer
    lookup_url_kwarg = 'pk'  # Nombre del parámetro en la URL que indica el ID del requisito a eliminar
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "La solicitud de trámite ha sido eliminado exitosamente."}, status=status.HTTP_204_NO_CONTENT)
    
# ======================================
#      Views de dependencias
#=======================================
class GetDependenciesView(GenericAPIView):
    serializer_class = DependenceSerializer
    queryset = Dependence.objects.all()
    
    def get(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CreateDependenceView(GenericAPIView):
    serializer_class = DependenceSerializer

    def post(self, request, *args, **kwargs):
        serializers = self.serializer_class(data=request.data)
        
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateDependenceView(UpdateAPIView):
    serializer_class = DependenceSerializer
    queryset = Dependence.objects.all()
    lookup_url_kwarg = 'pk'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#-------VISTA PARA CREAR USUARIO POLICIAS------------
class RegisterUserPoliView(GenericAPIView):
    #utilizo la clase serializable
    serializer_class = UserPoliRegisterSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            errores = serializer.errors
            print(errores)
            mensaje_error = {"error": "No se pudo registrar el usuario", "detalles": errores}
            return Response(mensaje_error, status=status.HTTP_400_BAD_REQUEST)
        
class DeleteUserPoliView(DestroyAPIView):
    queryset = Usuarios.objects.all()
    serializer_class = UserPoliceSerializer
    lookup_field = 'id'  # o 'pk' si tu modelo utiliza 'pk' como clave primaria

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Usuario eliminado exitosamente"}, status=status.HTTP_204_NO_CONTENT)

class GetSuperusersView(GenericAPIView):
    serializer_class = GetSuperusersSerializer
    queryset = Usuarios.objects.filter(Q(role='admin') | Q(role='police'))

    def get(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
             
class UpdatePoliceView(UpdateAPIView):
    serializer_class = ListUsersSerializer
    queryset = Usuarios.objects.all()
    lookup_url_kwarg = 'id'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Vista para actualizar el numero de telefono        
class UpdatePhoneNumberView(UpdateAPIView):
    serializer_class = UpdatePhoneNumberSerializer
    queryset = Usuarios.objects.all()
    lookup_url_kwarg = 'pk'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Vista para actualizar el Email
class UpdateEmailView(UpdateAPIView):
    serializer_class = UpdateEmailSerializer
    queryset = Usuarios.objects.all()
    lookup_url_kwarg = 'pk'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Vista para actualizar la imagen de perfil
class UpdateImagView(UpdateAPIView):
    serializer_class = UpdatePerfilImaglSerializer
    queryset = Usuarios.objects.all()
    lookup_url_kwarg = 'pk'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Vista para actualizar la contraseña de la cuenta
class UpdatePasswordView(UpdateAPIView):
    serializer_class = UpdatePasswordSerializer
    queryset = Usuarios.objects.all()
    lookup_url_kwarg = 'pk'

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
