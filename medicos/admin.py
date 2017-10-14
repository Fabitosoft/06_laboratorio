from django.contrib import admin

from import_export.resources import ModelResource
from import_export.admin import ImportExportModelAdmin
from .models import Especialidad, MedicoRemitente, Especialista


class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ['nombre', ]


class EspecialistaAdmin(admin.ModelAdmin):
    list_display = ['nombres', 'apellidos']
    search_fields = ['nombres', 'apellidos']


class MedicoRemitenteAdmin(admin.ModelAdmin):
    list_display = ['nombres', 'apellidos']
    search_fields = ['nombres', 'apellidos']


admin.site.register(Especialidad, EspecialidadAdmin)
admin.site.register(MedicoRemitente, MedicoRemitenteAdmin)
admin.site.register(Especialista, EspecialistaAdmin)
