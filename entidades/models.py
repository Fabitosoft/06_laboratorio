from django.db import models


class Entidad(models.Model):
    codigo_entidad = models.PositiveIntegerField()
    nombre = models.CharField(max_length=200, unique=True)
    nit = models.CharField(max_length=100, unique=True)
    correo_electronico = models.EmailField(unique=True)
    contacto = models.CharField(max_length=150, null=True, blank=True)
    direccion = models.CharField(max_length=200, null=True, blank=True)
    direccion_2 = models.CharField(max_length=200, null=True, blank=True)
    direccion_3 = models.CharField(max_length=200, null=True, blank=True)
    telefono = models.CharField(max_length=200, null=True, blank=True)
    telefono_2 = models.CharField(max_length=200, null=True, blank=True)
    telefono_3 = models.CharField(max_length=200, null=True, blank=True)

    # contacto = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'Entidades'
        verbose_name = 'Entidad'

    def __str__(self):
        return self.nombre
