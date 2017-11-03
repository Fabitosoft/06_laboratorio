from django.db import models


class AgrupacionExamen(models.Model):
    nombre = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Exámen Agrupado'
        verbose_name_plural = 'Examenes Agrupados'


class Examen(models.Model):
    codigo_cups = models.PositiveIntegerField(help_text='Código de clasificación única en procedimientos en salud',
                                              unique=True)
    nombre = models.CharField(verbose_name='Nombre del Examen', max_length=300)
    nombre_corto = models.CharField(verbose_name='Nombre del Examen (Corto)', max_length=100, blank=True, null=True)
    valor_referencia = models.CharField(max_length=200, verbose_name='Valor de Referencia', blank=True, null=True)
    unidad_medida = models.CharField(max_length=50, verbose_name='Unidad de Medida', blank=True, null=True)
    tecnica = models.CharField(max_length=100, verbose_name='Técnica', blank=True, null=True)
    costo_referencia = models.DecimalField(max_digits=10, decimal_places=1, default=0,
                                           verbose_name='Costo Referencia del Examen')
    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = 'Exámen'
        verbose_name_plural = 'Examenes'