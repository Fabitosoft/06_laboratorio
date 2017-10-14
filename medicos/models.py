from django.db import models
from model_utils.models import TimeStampedModel


class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = 'Especialidades'
        verbose_name = 'Especialidad'

    def __str__(self):
        return self.nombre


class MedicoRemitente(TimeStampedModel):
    nombres = models.CharField(max_length=60)
    apellidos = models.CharField(max_length=60)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT, verbose_name='Especialidad', null=True,
                                     blank=True)
    telefono = models.CharField(max_length=120, null=True, blank=True)
    telefono_1 = models.CharField(max_length=120, null=True, blank=True)
    telefono_2 = models.CharField(max_length=120, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Médicos Remitentes'
        verbose_name = 'Médico Remitente'

    def __str__(self):
        return '%s %s' % (self.nombres, self.apellidos)


class Especialista(TimeStampedModel):
    identificacion = models.CharField(max_length=20, unique=True)
    nombres = models.CharField(max_length=60)
    apellidos = models.CharField(max_length=60)
    especialidad = models.ForeignKey(Especialidad, on_delete=models.PROTECT, verbose_name='Especialidad')
    universidad = models.CharField(max_length=100)
    registro_profesional = models.CharField(max_length=100)
    firma = models.ImageField(null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Especialistas'
        verbose_name = 'Especialista'

    def __str__(self):
        return '%s %s' % (self.nombres, self.apellidos)
