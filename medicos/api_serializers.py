from rest_framework import serializers

from .models import MedicoRemitente, Especialista, Especialidad


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = [
            'id',
            'nombre',
            'activo_especialistas'
        ]


class MedicoRemitenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicoRemitente
        fields = [
            'id',
            'nombres',
            'apellidos',
            'especialidad_temporal',
            'telefono',
            'full_name'
        ]


class EspecialistaSerializer(serializers.ModelSerializer):
    firma_url = serializers.SerializerMethodField()

    class Meta:
        model = Especialista
        fields = [
            'id',
            'full_name',
            'nombre',
            'nombre_segundo',
            'apellido',
            'apellido_segundo',
            'genero',
            'tipo_documento',
            'nro_identificacion',
            'fecha_nacimiento',
            'grupo_sanguineo',
            'especialidad',
            'universidad',
            'registro_profesional',
            'activo',
            'firma',
            'firma_url'
        ]
        extra_kwargs = {
            'full_name': {'read_only': True},
            'firma': {'required': False, 'write_only': True, 'allow_empty_file': True},
            'apellido': {'required': False},
            'fecha_nacimiento': {'required': False},
            'nombre': {'required': False},
            'nro_identificacion': {'required': False},
        }

    def get_firma_url(self, obj):
        if obj.firma:
            return obj.firma.url
        return None
