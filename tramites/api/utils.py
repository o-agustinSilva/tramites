import random
from django.conf import settings
from api.models import Usuarios, OneTimePasswords
from django.core.mail import EmailMessage

# Cambiar por django-otp
def generateOtp():
    otp = ""
    for i in range(6):
        otp += str(random.randint(1, 9))
    return otp

def send_code_to_user(email):
    Subject     = "Confirmación de cuenta"
    otp_code    = generateOtp()
    print(otp_code)

    usuario = Usuarios.objects.get(email=email)
    email_body = f"Hola {usuario.get_full_name}, gracias por utilizar nuestros servicios, este es el código para finalizar el registro de su cuenta \n{otp_code}"
    from_email = settings.DEFAULT_FROM_EMAIL

    OneTimePasswords.objects.create(usuario=usuario, code=otp_code)
    send_email = EmailMessage(subject=Subject, body=email_body, from_email = from_email, to=[email])
    send_email.send(fail_silently=True)

def send_normal_email(data):
    email = EmailMessage(
        subject = data['email_subject'],
        body = data['email_body'],
        from_email = settings.EMAIL_HOST_USER,
        to = [data['to_email']]
    )
    email.send()