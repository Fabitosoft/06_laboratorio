from rest_framework import serializers

from .models import Orden, OrdenExamen, HistorialOrdenExamen


class HistorialOrdenExamenSerializer(serializers.ModelSerializer):
    generado_por = serializers.CharField(source='generado_por.username', read_only=True)

    class Meta:
        model = HistorialOrdenExamen
        fields = '__all__'


class OrdenExamenSerializer(serializers.ModelSerializer):
    sub_categoria_cup_nombre = serializers.CharField(source='examen.subgrupo_cups.nombre', read_only=True)
    entidad_nombre = serializers.CharField(source='orden.entidad.nombre', read_only=True)
    mis_bitacoras = HistorialOrdenExamenSerializer(many=True, read_only=True)

    class Meta:
        model = OrdenExamen
        fields = [
            'id',
            'examen_estado',
            'examen',
            'paciente_nombre',
            'orden',
            'examen_nombre',
            'entidad_nombre',
            'tecnica',
            'examen_valor_referencia',
            'examen_codigo_cups',
            'sub_categoria_cup_nombre',
            'examen_unidad_medida',
            'resultado',
            'descuento',
            'valor_total',
            'valor_descuento',
            'valor_final',
            'mis_bitacoras'
        ]
        extra_kwargs = {
            'resultado': {'required': False, 'allow_blank': True, 'allow_null': True},
            'examen_valor_referencia': {'required': False, 'allow_blank': True, 'allow_null': True},
            'examen_unidad_medida': {'required': False, 'allow_blank': True, 'allow_null': True},
            'tecnica': {'required': False, 'allow_blank': True, 'allow_null': True}
        }


class OrdenSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.full_name', read_only=True)
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
