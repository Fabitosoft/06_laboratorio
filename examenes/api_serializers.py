from rest_framework import serializers

from .models import Examen


class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = [
            'id',
            'codigo_cups',
            'nombre',
            'valor_referencia',
            'unidad_medida',
            'costo_referencia'
        ]
