from django.db import models
from django.contrib.auth.models import User
from model_utils.models import TimeStampedModel

from pacientes.models import Paciente
from medicos.models import MedicoRemitente
from entidades.models import Entidad
from examenes.models import Examen


class Orden(TimeStampedModel):
    RELACION_COBRO_CHOICES = (
        ('EFECTIVO', 'Efectivo'),
        ('TARJETA', 'Tarjeta'),
        ('RELACION DE COBRO', 'Relación de Cobro'),
        ('CORTESIA', 'Cortesía'),
    )

    ORDEN_ESTADO_CHOICES = (
        (0, 'Creado'),
        (1, 'Pagado'),
    )

    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT, related_name='mis_ordenes')
    medico_remitente = models.ForeignKey(MedicoRemitente, on_delete=models.PROTECT, related_name='mis_ordenes',
                                         null=True,
                                         blank=True)
    elaborado_por = models.ForeignKey(User, on_delete=models.PROTECT, related_name='mis_ordenes_elaboradas', null=True,
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

    estado = models.PositiveIntegerField(default=0)


class OrdenExamen(TimeStampedModel):
    EXAMEN_ESTADO_CHOICES = (
        (0, 'Creado'),
        (1, 'Con Resultados'),
        (2, 'Verificado'),
        (3, 'Impreso'),
    )
    examen_estado = models.PositiveIntegerField(default=0, choices=EXAMEN_ESTADO_CHOICES)
    examen = models.ForeignKey(Examen, related_name='resultados')
    orden = models.ForeignKey(Orden, related_name='mis_examenes')
    examen_nombre = models.CharField(verbose_name='Nombre del Examen', max_length=300)
    examen_codigo_cups = models.PositiveIntegerField(
        help_text='Código de clasificación única en procedimientos en salud')
    examen_unidad_medida = models.CharField(max_length=50, verbose_name='Unidad de Medida', blank=True, null=True)

    resultado = models.CharField(max_length=300, default='')
    descuento = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    valor_total = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Total')
    valor_descuento = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                          verbose_name='Valor Descuento')
    valor_final = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Final')
