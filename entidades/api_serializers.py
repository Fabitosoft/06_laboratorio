from rest_framework import serializers

from .models import Entidad, EntidadExamen

from examenes.api_serializers import ExamenSerializer


class EntidadExamenSerializer(serializers.ModelSerializer):
    examen = ExamenSerializer()

    class Meta:
        model = EntidadExamen
        fields = ['id', 'examen', 'valor_examen']


class EntidadSerializer(serializers.ModelSerializer):
    mis_examenes = EntidadExamenSerializer(read_only=True, many=True)

    class Meta:
        model = Entidad
        fields = ['id', 'nombre', 'nit', 'mis_examenes']
