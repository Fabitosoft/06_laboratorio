from rest_framework import serializers

from .models import Entidad, EntidadExamen

from examenes.api_serializers import ExamenSerializer


# id',
#             'codigo_cups',
#             'nombre',
#             'valor_referencia',
#             'unidad_medida'

class EntidadExamenSerializer(serializers.ModelSerializer):
    examen_nombre = serializers.CharField(source='examen.nombre', read_only=True)
    examen_id = serializers.IntegerField(source='examen.id', read_only=True)
    examen_codigo_cups = serializers.CharField(source='examen.codigo_cups', read_only=True)
    examen_valor_referencia = serializers.CharField(source='examen.valor_referencia', read_only=True)
    examen_unidad_medida = serializers.CharField(source='examen.unidad_medida', read_only=True)

    class Meta:
        model = EntidadExamen
        fields = [
            'id',
            'examen_id',
            'examen_codigo_cups',
            'examen_valor_referencia',
            'examen_nombre',
            'examen_unidad_medida',
            'valor_examen'
        ]


class EntidadSerializer(serializers.ModelSerializer):
    mis_examenes = EntidadExamenSerializer(read_only=True, many=True)

    class Meta:
        model = Entidad
        fields = ['id', 'nombre', 'nit', 'mis_examenes']
