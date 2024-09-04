from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from unicodedata import name
from api.views import *

urlpatterns = [
    # ======================================
    #           Gestión de usuarios
    #=======================================
    path('users/', ListUsersView.as_view(), name='list-users'),
    path('get-user/<int:pk>/', GetUserView.as_view(), name='get-user'),
    path('user-details/<str:email>/', UserDetailsView.as_view(), name='user-details'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='verify-email'),
    path('resend-otp/', ResendOtp.as_view(), name='resend-otp'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('profile/', TestAuthenticationView.as_view(), name='granted'),
    path('roles/', RoleView.as_view(), name='roles'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh-token'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>', PasswordResetConfirm.as_view(), name='password-reset-confirm'),
    path('set-new-password/', SetNewPassword.as_view(), name='set-new-password'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    
    # URL PARA ACTUALIZAR DATOS DESDE LOS USUARIOS
    path('update-phone-number/<int:pk>/', UpdatePhoneNumberView.as_view(), name='update_phone_number'),
    path('update-email/<int:pk>/', UpdateEmailView.as_view(), name='update_email'),
    path('update-perfil-imag/<int:pk>/', UpdateImagView.as_view(), name='update_ImagPerfil'),
    path('update-password/<int:pk>/', UpdatePasswordView.as_view(), name='update_password'),
    path('update-address/<int:pk>/', UpdateAddressView.as_view(), name='update_address'),
    
    # ======================================
    #   Gestión de trámites y requisitos
    #=======================================
    path('create-requirement/', CreateRequirementView.as_view(), name='create-requirement'),
    path('get-requirements/', GetRequirementsView.as_view(), name='get-requirement'),
    path('delete-requirement/<int:pk>/', DeleteRequirementView.as_view(), name='delete-requirement'),

    path('create-tramite/', CreateTramiteView.as_view(), name='create-tramite'),
    path('get-tramites/', ListTramites.as_view(), name='get-tramite'),
    path('get-tramite/<int:pk>/', GetTramiteView.as_view(), name='get-tramite'),
    path('delete-tramite/<int:pk>/', DeleteTramiteView.as_view(), name='delete-tramite'),
    path('update-tramite/<int:pk>/', UpdateTramiteView.as_view(), name='update-tramite'),    
    path('request-tramite/', RequestTramiteView.as_view(), name='request-tramite'),

    path('addpdf-case/<int:pk>/', AddDocumentoPDF.as_view(), name='addpdf-caso'),
    path('case-rechazo/<int:pk>/', RechazarTramiteView.as_view(), name='caso-rechazado'),
    path('get-case/<int:pk>/', GetCaseView.as_view(), name='get-case'),
    path('list-cases/', ListCasesView.as_view(), name='list-cases'),
    path('list-cases/<str:filter>/', FilterCasesView.as_view(), name='filter-cases'),
    path('list-cases-by-user/<int:user_id>/<str:status>/', FilterCasesByUserAndStatusView.as_view(), name='filter-cases-by-user'),
    path('get-pending-cases/<int:user_id>/', GetPendingCasesView.as_view(), name='get-pending-cases'),
    path('get-completed-cases/<int:user_id>/', GetCompletedCasesView.as_view(), name='get-completed-cases'),
    path('claim-case/<int:pk>/', UpdateCaseView.as_view(), name='claim-case'),
    path('delete-case/<int:pk>/', DeleteCaseView.as_view(), name='delete-case'),
    path('delete-requested-tramite/<int:pk>/', RequestTramiteView.as_view(), name='request-tramite'),

    # ======================================
    #       Gestión de dependencias
    #=======================================
    path('get-dependences/', GetDependenciesView.as_view(), name='get-dependences'),
    path('create-dependence/', CreateDependenceView.as_view(), name='create-dependences'),
    path('update-dependence/<int:pk>/', UpdateDependenceView.as_view(), name='update-dependences'),

    # ======================================
    # Gestión de usuarios policias/administradores
    #=======================================
    path('get-superusers/', GetSuperusersView.as_view(), name='get-superusers'),
    path('registerPolicia/', RegisterUserPoliView.as_view(), name='registerPoli'),
    path('deleteUserPolicia/<int:id>/', DeleteUserPoliView.as_view(), name='deletePoli'),
    path('update-police/<int:id>/', UpdatePoliceView.as_view(), name='update-police'),

    # ======================================
    # Gestión de pagos
    #=======================================
    path('payment/', PaymentView.as_view(), name='payment'),
    path('list-payment/', ListPayment.as_view(), name='list-payment'),
    path('get-payment/<int:case_id>/', GetPayment.as_view(), name='get-payment'),
    path('update-caseId/<int:transaction_Id>/', UpdateCaseIdView.as_view(), name='update-caseId'),
]
