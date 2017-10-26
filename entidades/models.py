from django.db import models
from examenes.models import Examen


class Entidad(models.Model):
    nombre = models.CharField(max_length=200, unique=True)
    nit = models.CharField(max_length=100, null=True, blank=True)
    direccion = models.CharField(max_length=200, null=True, blank=True)
    direccion_2 = models.CharField(max_length=200, null=True, blank=True)
    direccion_3 = models.CharField(max_length=200, null=True, blank=True)
    telefono = models.CharField(max_length=200, null=True, blank=True)
    telefono_2 = models.CharField(max_length=200, null=True, blank=True)
    telefono_3 = models.CharField(max_length=200, null=True, blank=True)
    examenes = models.ManyToManyField(Examen, through='EntidadExamen')

    class Meta:
        verbose_name_plural = 'Entidades'
        verbose_name = 'Entidad'

    def __str__(self):
        return self.nombre


class ContactoEntidad(models.Model):
    nombre = models.CharField(max_length=150, blank=True, null=True)
    correo_electronico = models.EmailField()
    entidad = models.ForeignKey(Entidad)
    enviar_correo = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Contactos Entidad'
        verbose_name = 'Contacto Entidad'


class EntidadExamen(models.Model):
    examen = models.ForeignKey(Examen, on_delete=models.PROTECT, related_name='mis_entidades')
    entidad = models.ForeignKey(Entidad, on_delete=models.PROTECT)
    valor_examen = models.DecimalField(max_digits=10, decimal_places=1, default=0)
