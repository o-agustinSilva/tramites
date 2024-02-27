from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class UserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError(_("Ingresar un correo electrónico válido"))

    def create_citizen(self, email, firstname, lastname, number, role, birthdate, password, address, address_number, floor, apartment, phone, phone_area_code, document_type, genre):
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("El correo electrónico es requerido"))
        if not firstname:
            raise ValueError(_("El nombre es requerido"))
        if not lastname:
            raise ValueError(_("El apellido es requerido"))
        
        citizen = self.model(
            email=email,
            firstname=firstname,
            lastname=lastname,
            number=number,
            role=role,
            birthdate=birthdate,
            address=address,
            address_number=address_number,
            floor=floor,
            apartment=apartment,
            phone=phone,
            phone_area_code=phone_area_code,
            genre=genre,
            document_type=document_type
        )
        citizen.set_password(password)
        citizen.save(using=self._db)
        return citizen
    

    def create_police(self, email, firstname, lastname, number, role, password, address, address_number, floor, apartment, document_type, genre,  hierarchy, dependence, is_verified ):
        if email:
            email = self.normalize_email(email)
            self.email_validator(email)
        else:
            raise ValueError(_("El correo electrónico es requerido"))
        if not firstname:
            raise ValueError(_("El nombre es requerido"))
        if not lastname:
            raise ValueError(_("El apellido es requerido"))
        
        police = self.model(
            email=email,
            firstname=firstname,
            lastname=lastname,
            number=number,
            role=role,
            address=address,
            address_number=address_number,
            floor=floor,
            apartment=apartment,
            genre=genre,
            document_type=document_type,
            hierarchy=hierarchy,
            dependence=dependence,
            is_verified=is_verified
        )
        police.set_password(password)
        police.save(using=self._db)
        return police
    