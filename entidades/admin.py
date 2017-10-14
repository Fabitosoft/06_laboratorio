from django.contrib import admin
from import_export.resources import ModelResource
from import_export.admin import ImportExportModelAdmin

from .models import Entidad, ContactoEntidad


class ContactoEntidadInline(admin.TabularInline):
    model = ContactoEntidad
    fields = ['nombre', 'correo_electronico', 'entidad', 'enviar_correo']


class EntidadResource(ModelResource):
    class Meta:
        model = Entidad


class EntidadAdmin(ImportExportModelAdmin):
    search_fields = ['nombre']
    list_display = [
        'nombre',
        'nit',
        'direccion',
        'direccion_2',
        'direccion_3',
        'telefono',
        'telefono_2',
        'telefono_3'
    ]
    resource_class = EntidadResource
    inlines = [ContactoEntidadInline]


admin.site.register(Entidad, EntidadAdmin)
