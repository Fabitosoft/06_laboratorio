from django.db import models


class Examen(models.Model):
    codigo_cups = models.PositiveIntegerField(help_text='Código de clasificación única en procedimientos en salud',
                                              unique=True)
    nombre = models.CharField(verbose_name='Nombre del Examen', max_length=300)
    nombre_corto = models.CharField(verbose_name='Nombre del Examen (Corto)', max_length=100, blank=True, null=True)
    valor_referencia = models.CharField(max_length=200, verbose_name='Valor de Referencia', blank=True, null=True)
    unidad_medida = models.CharField(max_length=50, verbose_name='Unidad de Medida', blank=True, null=True)
    tecnica = models.CharField(max_length=100, verbose_name='Técnica', blank=True, null=True)

    class Meta:
        verbose_name = 'Examen'
        verbose_name_plural = 'Examenes'
