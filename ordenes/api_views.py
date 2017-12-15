from django.db.models import Q
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from .models import Orden, OrdenExamen
from rest_framework import viewsets, status

from .api_serializers import OrdenSerializer, OrdenExamenSerializer


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.select_related(
        'medico_remitente',
        'paciente',
        'entidad',
        'elaborado_por'
    ).prefetch_related(
        'mis_examenes__examen'
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
        'examen__subgrupo_cups',
        'orden__entidad'
    ).prefetch_related(
        'mis_bitacoras__generado_por',
        'mis_firmas__especialista',
        'mis_firmas__especialista__especialidad'
    ).all().order_by('pk')
    serializer_class = OrdenExamenSerializer

    @list_route(methods=['get'])
    def en_proceso(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado=0)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def con_resultados(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado=1)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def verificados(self, request):
        qs = self.get_queryset().filter(orden__estado=1, examen_estado__in=[2, 3])
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def firmar(self, request, pk=None):
        orden_examen = self.get_object()
        user = self.request.user
        if hasattr(user, 'especialista'):
            especialista = user.especialista
            if hasattr(especialista, 'firma'):
                if not orden_examen.mis_firmas.filter(especialista=especialista).exists():
                    orden_examen.mis_firmas.create(especialista=especialista)
                return Response({'resultado': 'ok'})
            return Response({'error': 'No tiene firma'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'No es especialista'}, status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post', 'get'])
    def quitar_firmar(self, request, pk=None):
        orden_examen = self.get_object()
        user = self.request.user
        if hasattr(user, 'especialista'):
            especialista = user.especialista
            orden_examen.mis_firmas.filter(especialista=especialista).all()
            return Response({'resultado': 'ok'})

    def perform_create(self, serializer):
        serializer.save(creado_por=self.request.user)

    def perform_update(self, serializer):
        serializer.save(modificado_por=self.request.user)
