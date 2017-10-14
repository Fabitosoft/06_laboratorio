from django.contrib import admin

from .models import Entidad


class EntidadAdmin(admin.ModelAdmin):
    search_fields = ['nombre']
    list_display = ['nombre', 'nit', 'correo_electronico', 'direccion', 'telefono']


admin.site.register(Entidad, EntidadAdmin)
