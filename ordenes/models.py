from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum
from django.db.models.functions import Coalesce
from model_utils.models import TimeStampedModel

from pacientes.models import Paciente
from medicos.models import MedicoRemitente, Especialista
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

    estado = models.PositiveIntegerField(default=0, choices=ORDEN_ESTADO_CHOICES)

    def calcular_totales(self):
        totales = self.mis_examenes.aggregate(
            valor_total=Coalesce(Sum('valor_total'), 0),
            valor_descuento=Coalesce(Sum('valor_descuento'), 0),
            valor_final=Coalesce(Sum('valor_final'), 0)
        )
        self.valor_descuento = totales['valor_descuento']
        self.valor_total = totales['valor_total']
        self.valor_final = totales['valor_final']
        self.save()


class OrdenExamen(TimeStampedModel):
    EXAMEN_ESTADO_CHOICES = (
        (0, 'En Proceso'),
        (1, 'Con Resultados'),
        (2, 'Verificado'),
        (3, 'Impreso'),
    )
    examen_estado = models.PositiveIntegerField(default=0, choices=EXAMEN_ESTADO_CHOICES)
    examen = models.ForeignKey(Examen, related_name='resultados')
    orden = models.ForeignKey(Orden, related_name='mis_examenes')
    tecnica = models.CharField(max_length=100, verbose_name='Técnica', blank=True, null=True)
    examen_valor_referencia = models.TextField(verbose_name='Valor de Referencia', blank=True, null=True)

    especial = models.BooleanField(default=False, verbose_name='Plantilla Especial')
    nro_plantilla = models.PositiveIntegerField(verbose_name='Nro. Plantilla Especial', blank=True, null=True)

    creado_por = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True,
                                   related_name='mis_examenes_creados')
    modificado_por = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True,
                                       related_name='mis_examenes_modificados')

    paciente_nombre = models.CharField(max_length=200)
    examen_nombre = models.CharField(verbose_name='Nombre del Examen', max_length=300)
    examen_codigo_cups = models.PositiveIntegerField(
        help_text='Código de clasificación única en procedimientos en salud')
    examen_unidad_medida = models.CharField(max_length=50, verbose_name='Unidad de Medida', blank=True, null=True)

    resultado = models.CharField(max_length=300, default='', blank=True, null=True)
    descuento = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    valor_total = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Total')
    valor_descuento = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                          verbose_name='Valor Descuento')
    valor_final = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Final')
    observaciones = models.TextField(null=True, blank=True)

    class Meta:
        permissions = [
            ('orden_examen_firmar_como', 'Puede Firmar Examen como Otros'),
            ('orden_examen_verificar', 'Puede Verificar Examen'),
            ('orden_examen_cambiar_estado', 'Puede Cambiar Estado Examen'),
        ]

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self.examen_estado in [0, 1]:
            if self.resultado:
                self.examen_estado = 1
            else:
                self.examen_estado = 0
        super().save(force_insert, force_update, using, update_fields)
        self.orden.calcular_totales()

    def delete(self, using=None, keep_parents=False):
        orden = self.orden
        delete = super().delete(using, keep_parents)
        orden.calcular_totales()
        return delete

    def firmar(self, especialista):
        if self.examen.multifirma:
            if not self.mis_firmas.filter(especialista=especialista).exists():
                self.mis_firmas.create(especialista=especialista)
        else:
            for firma in self.mis_firmas.all():
                firma.delete()
            self.mis_firmas.create(especialista=especialista)


class OrdenExamenFirmas(TimeStampedModel):
    orden_examen = models.ForeignKey(OrdenExamen, related_name='mis_firmas')
    especialista = models.ForeignKey(Especialista, related_name='mis_examenes_firmados')


class HistorialOrdenExamen(TimeStampedModel):
    tipo_bitacora = models.CharField(max_length=100)
    generado_por = models.ForeignKey(User, related_name='mis_bitacoras_orden_examen')
    orden_examen = models.ForeignKey(OrdenExamen, related_name='mis_bitacoras', on_delete=models.CASCADE)
    examen_estado = models.CharField(max_length=100)
    tecnica = models.CharField(max_length=100, verbose_name='Técnica', blank=True, null=True)
    examen_valor_referencia = models.TextField(verbose_name='Valor de Referencia', blank=True, null=True)
    paciente_nombre = models.CharField(max_length=200)
    examen_nombre = models.CharField(verbose_name='Nombre del Examen', max_length=300)
    examen_codigo_cups = models.PositiveIntegerField(
        help_text='Código de clasificación única en procedimientos en salud')
    examen_unidad_medida = models.CharField(max_length=50, verbose_name='Unidad de Medida', blank=True, null=True)

    resultado = models.CharField(max_length=300, default='', blank=True, null=True)
    descuento = models.DecimalField(max_digits=4, decimal_places=1, default=0)
    valor_total = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Total')
    valor_descuento = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                          verbose_name='Valor Descuento')
    valor_final = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                      verbose_name='Valor Final')
