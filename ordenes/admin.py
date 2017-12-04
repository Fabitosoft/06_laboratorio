from django.contrib import admin

from .models import Orden


class OrdenExamenInLine(admin.TabularInline):
    model = Orden.examenes.through


class OrdenAdmin(admin.ModelAdmin):
    list_display = [
        'paciente',
        'tipo_pago',
        'medico_remitente',
        'entidad',
        'estado'
    ]
    inlines = [OrdenExamenInLine, ]


admin.site.register(Orden, OrdenAdmin)
