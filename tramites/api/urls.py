from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView)
from unicodedata import name
from api.views import *

#IMPORTO LA VISTA DE POLI
from api.views import RegisterUserPoliView

urlpatterns = [
    # ======================================
    #           Gestión de usuarios
    #=======================================
    path('users/', ListUsersView.as_view(), name='list-users'),
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

    # ======================================
    #   Gestión de trámites y requisitos
    #=======================================
    path('create-requirement/', CreateRequirementView.as_view(), name='create-requirement'),
    path('get-requirements/', GetRequirementsView.as_view(), name='get-requirement'),
    path('delete-requirement/<int:pk>/', DeleteRequirementView.as_view(), name='delete-requirement'),

    path('create-tramite/', CreateTramiteView.as_view(), name='create-tramite'),
    path('get-tramites/', GetTramiteView.as_view(), name='get-tramite'),
    path('delete-tramite/<int:pk>/', DeleteRequirementView.as_view(), name='delete-tramite'),
    
    #URL PARA EL CREAR USUARIOS POLI
    path('registerPolicia/', RegisterUserPoliView.as_view(), name='registerPoli'),
]