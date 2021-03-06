from django.contrib import admin

from import_export.resources import ModelResource
from import_export.admin import ImportExportModelAdmin
from .models import Especialidad, MedicoRemitente, Especialista


class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ['nombre', ]


class EspecialistaAdmin(admin.ModelAdmin):
    list_display = [
        'nombre',
        'nombre_segundo',
        'apellido',
        'apellido_segundo',
        'nro_identificacion',
        'especialidad',
        'universidad',
        'registro_profesional',
    ]
    search_fields = ['nombre', 'nombre_segundo', 'apellido', 'apellido_segundo', ]


class MedicoRemitenteResource(ModelResource):
    class Meta:
        model = MedicoRemitente


class MedicoRemitenteAdmin(ImportExportModelAdmin):
    list_display = [
        'nombres',
        'apellidos',
        'especialidad',
        'especialidad_temporal',
        'telefono',
        'telefono_1',
        'telefono_2'
    ]
    search_fields = ['nombres', 'apellidos']
    resource_class = MedicoRemitenteResource


admin.site.register(Especialidad, EspecialidadAdmin)
admin.site.register(MedicoRemitente, MedicoRemitenteAdmin)
admin.site.register(Especialista, EspecialistaAdmin)
