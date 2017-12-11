from django.db.models import Q
from rest_framework.decorators import list_route
from rest_framework.response import Response

from .models import Orden, OrdenExamen
from rest_framework import viewsets

from .api_serializers import OrdenSerializer, OrdenExamenSerializer


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.select_related(
        'medico_remitente',
        'paciente',
        'entidad',
        'elaborado_por'
    ).prefetch_related(
        'mis_examenes'
    ).all()
    serializer_class = OrdenSerializer

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 0:
            qs = self.get_queryset().filter(
                Q(paciente__nombre__icontains=parametro) |
                Q(paciente__nombre_segundo__icontains=parametro) |
                Q(paciente__apellido__icontains=parametro) |
                Q(paciente__apellido_segundo__icontains=parametro) |
                Q(paciente__nro_identificacion__icontains=parametro) |
                Q(id__icontains=parametro)
            ).distinct().order_by('-pk')
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(elaborado_por=self.request.user)


class OrdenExamenViewSet(viewsets.ModelViewSet):
    queryset = OrdenExamen.objects.select_related(
        'orden',
        'orden__paciente',
        'examen',
        'examen__subgrupo_cups',
        'orden__entidad'
    ).all().order_by('pk')
    serializer_class = OrdenExamenSerializer

    @list_route(methods=['get'])
    def en_proceso(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado=0)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)

    def perform_update(self, serializer):
        serializer.save(modificado_por=self.request.user)
