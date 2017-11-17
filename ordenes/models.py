from django.db import models
from model_utils.models import TimeStampedModel

from pacientes.models import Paciente
from medicos.models import MedicoRemitente
from entidades.models import Entidad
from examenes.models import Examen


class Orden(TimeStampedModel):
    RELACION_COBRO_CHOICES = (
        ('efectivo', 'Efectivo'),
        ('tarjeta', 'Tarjeta'),
        ('relacion_cobro', 'Relación de Cobro'),
        ('cortesia', 'Cortesía'),
    )
    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT, related_name='mis_ordenes')
    medico_remitente = models.ForeignKey(MedicoRemitente, on_delete=models.PROTECT, related_name='mis_ordenes',
                                         null=True,
                                         blank=True)
    tipo_pago = models.CharField(max_length=30, choices=RELACION_COBRO_CHOICES, default='efectivo')
    entidad = models.ForeignKey(Entidad, on_delete=models.PROTECT, related_name='mis_ordenes')
    nombre_contacto_alternativo = models.CharField(max_length=200, verbose_name='Nombre Contacto', null=True,
                                                   blank=True)
    numero_contacto_alternativo = models.CharField(max_length=100, verbose_name='Número Contacto', null=True,
                                                   blank=True)
    direccion_contacto_alternativo = models.CharField(max_length=200, verbose_name='Dirección Contacto', null=True,
                                                      blank=True)
    valor_total = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Total')
    valor_descuento = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                          verbose_name='Valor Descuento')
    valor_final = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Final')
    examenes = models.ManyToManyField(Examen, through='OrdenExamen', related_name='mis_examenes')


class OrdenExamen(models.Model):
    examen = models.ForeignKey(Examen,related_name='resultados')
    orden = models.ForeignKey(Orden,related_name='resultados')
    valor_resultado = models.CharField(max_length=300, default='')