from rest_framework import serializers

from .models import MedicoRemitente


class MedicoRemitenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicoRemitente
        fields = '__all__'