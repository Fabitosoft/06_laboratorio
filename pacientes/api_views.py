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
    def buscar_nombre(self, request):
        parametro = request.GET.get('parametro')
        qs = Paciente.objects.filter(
            Q(nro_identificacion__icontains=parametro)
        )
        print(parametro)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
