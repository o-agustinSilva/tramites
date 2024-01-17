import secrets
from dateutil.relativedelta import relativedelta
from django.conf import settings
from api.models import Usuarios, OneTimePasswords
from django.core.mail import EmailMessage, send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from datetime import timedelta
from django.utils import timezone

#                               ¡ IMPORTANTE !
# =============================================================================
# = Una vez en producción, descomentar el envio de correos y sacar los prints =
# =============================================================================

# Considerar usar django-otp
def generateOtp():
    otp = ''.join(secrets.choice("0123456789") for _ in range(6))
    return otp

# Manejo de correos electrónicos ==========================================
def send_code_to_user(email):
    subject     = "Confirmación de cuenta"
    otp_code    = generateOtp()
    
    # Considerar agregar prevención de header injection https://docs.djangoproject.com/en/5.0/topics/email/#preventing-header-injection
    expiration_time = timezone.localtime(timezone.now()) + relativedelta(minutes=10)
    print(f"OTP: {otp_code}\nExpiración: {expiration_time}") # Sacar cuando se implemente los correos
    usuario = Usuarios.objects.get(email=email) 
    # Variables que se reflejarian en el template del correo
    context = {
        'otp_code': otp_code,
        'fullname': usuario.get_full_name,
        'expiration': 10,
    }

    # Renderizo el template con su contexto
    html_message = render_to_string("SendOtpEmail.html", context)
    plain_message = strip_tags(html_message)
    from_email = settings.DEFAULT_FROM_EMAIL

    OneTimePasswords.objects.create(usuario=usuario, code=otp_code, expiration=expiration_time)

    message = EmailMultiAlternatives(
        subject = subject,
        body = plain_message,
        from_email = from_email,
        to = [email],
    )
    message.attach_alternative(html_message, "text/html")
    message.send(fail_silently=True)

def send_normal_email(data):
    email = EmailMessage(
        subject = data['email_subject'],
        body = data['email_body'],
        from_email = settings.EMAIL_HOST_USER,
        to = [data['to_email']]
    )
    email.send()

# =========================================================================

# Esta sección se utiliza para verificar consistencia de datos  ===========
def has_required_age(birthdate_user):
    min_age = 16
    current_date = timezone.now().date()
    user_age = relativedelta(current_date, birthdate_user)

    return user_age.years >= min_age
# =========================================================================