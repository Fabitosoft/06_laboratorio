from rest_framework import serializers

from .models import Orden


class OrdenSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.get_full_name', read_only=True)

    class Meta:
        model = Orden
        fields = [
            'id',
            'created',
            'paciente',
            'paciente_nombre',
            'medico_remitente',
            'tipo_pago',
            'entidad',
            'nombre_contacto_alternativo',
            'numero_contacto_alternativo',
            'direccion_contacto_alternativo',
            'valor_total',
            'valor_descuento',
            'valor_final',
        ]
