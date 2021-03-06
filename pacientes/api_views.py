from django.db.models import Q
from rest_framework.decorators import list_route
from rest_framework.response import Response

from .models import Paciente
from rest_framework import viewsets

from .api_serializers import PacienteSerializer


class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = Paciente.objects.filter(
            Q(nro_identificacion__icontains=parametro) |
            Q(nombre__icontains=parametro) |
            Q(nombre_segundo__icontains=parametro) |
            Q(apellido__icontains=parametro) |
            Q(apellido_segundo__icontains=parametro)
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def validar_nuevo_paciente(self, request) -> Response:
        validacion_reponse = {}
        nro_identificacion = self.request.GET.get('nro_identificacion', None)
        tipo_documento = self.request.GET.get('tipo_documento', None)

        if nro_identificacion and tipo_documento and Paciente.existe_documento(tipo_documento, nro_identificacion):
            validacion_reponse.update({'nro_identificacion': 'Ya exite'})

        return Response(validacion_reponse)
