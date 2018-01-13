from rest_framework import serializers

from .models import Biopsia, Citologia


class BiopsiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biopsia
        fields = [
            'id',
            'orden_examen',
            'descripcion_macroscopica',
            'descripcion_microscopica',
            'diagnostico',
        ]


class CitologiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Citologia
        fields = '__all__'
