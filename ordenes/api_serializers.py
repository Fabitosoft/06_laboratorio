from rest_framework import serializers

from .models import Orden, OrdenExamen


class OrdenExamenSerializer(serializers.ModelSerializer):
    resultado = serializers.CharField(required=False)

    class Meta:
        model = OrdenExamen
        fields = '__all__'


class OrdenSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.get_full_name', read_only=True)
    mis_examenes = OrdenExamenSerializer(many=True, read_only=True)
    cajero = serializers.CharField(source='elaborado_por.get_full_name', read_only=True)

    class Meta:
        model = Orden
        fields = [
            'id',
            'created',
            'paciente',
            'cajero',
            'paciente_nombre',
            'medico_remitente',
            'tipo_pago',
            'entidad',
            'estado',
            'nombre_contacto_alternativo',
            'numero_contacto_alternativo',
            'direccion_contacto_alternativo',
            'valor_total',
            'valor_descuento',
            'valor_final',
            'mis_examenes',
        ]
