from django.db.models import Q
from rest_framework.decorators import list_route
from rest_framework.response import Response

from .models import Orden, OrdenExamen
from rest_framework import viewsets

from .api_serializers import OrdenSerializer, OrdenExamenSerializer


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 0:
            qs = Orden.objects.filter(
                Q(paciente__nombre__icontains=parametro) |
                Q(paciente__nombre_segundo__icontains=parametro) |
                Q(paciente__apellido__icontains=parametro) |
                Q(paciente__apellido_segundo__icontains=parametro) |
                Q(paciente__nro_identificacion__icontains=parametro) |
                Q(id__icontains=parametro)
            ).distinct().order_by('-pk')
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class OrdenExamenViewSet(viewsets.ModelViewSet):
    queryset = OrdenExamen.objects.all().order_by('pk')
    serializer_class = OrdenExamenSerializer
