from django.db import models
from model_utils.models import TimeStampedModel


class Paciente(TimeStampedModel):
    CHOICES_TIPO_DOCUMENTO = (
        ('CC', 'Cédula Ciudadanía'),
        ('CE', 'Cédula Extrangería'),
        ('PS', 'Pasaporte'),
        ('TI', 'Tarjeta Identidad'),
    )

    CHOICES_SEXO = (
        ('femenino', 'Femenino'),
        ('masculino', 'Masculino')
    )

    tipo_documento = models.CharField(max_length=2, choices=CHOICES_TIPO_DOCUMENTO, default='CC')
    nro_identificacion = models.CharField(max_length=30, unique=True)
    nombre = models.CharField(max_length=60)
    nombre_segundo = models.CharField(max_length=60, null=True, blank=True)
    apellido = models.CharField(max_length=60)
    apellido_segundo = models.CharField(max_length=60, null=True, blank=True)
    fecha_nacimiento = models.DateTimeField()
    telefono = models.CharField(max_length=20, null=True, blank=True)
    telefono_2 = models.CharField(max_length=20, null=True, blank=True)
    telefono_3 = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    email_2 = models.EmailField(null=True, blank=True)
    genero = models.CharField(choices=CHOICES_SEXO, default='femenino', max_length=20)

    def get_full_name(self):
        return '%s %s %s %s' % (self.nombre, self.nombre_segundo, self.apellido, self.apellido_segundo)

    class Meta:
        verbose_name_plural = 'Pacientes'
        verbose_name = 'Paciente'

    def __str__(self):
        return '%s %s %s %s' % (self.nombre, self.nombre_segundo, self.apellido, self.apellido_segundo)
