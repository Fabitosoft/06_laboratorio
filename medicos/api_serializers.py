from rest_framework import serializers

from .models import MedicoRemitente


class MedicoRemitenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicoRemitente
        fields = ['id', 'nombres', 'apellidos', 'especialidad_temporal', 'telefono', 'getFullName']