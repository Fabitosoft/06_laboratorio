from rest_framework import serializers

from .models import Examen


class ExamenSerializer(serializers.ModelSerializer):
    subgrupo_cups_nombre = serializers.CharField(source='subgrupo_cups.nombre', read_only=True)

    class Meta:
        model = Examen
        fields = [
            'id',
            'codigo_cups',
            'nombre',
            'valor_referencia',
            'unidad_medida',
            'costo_referencia',
            'subgrupo_cups',
            'subgrupo_cups_nombre',
            'multifirma',
            'especial',
            'nro_plantilla'
        ]
