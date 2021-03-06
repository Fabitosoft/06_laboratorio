from .models import Examen
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response

from .api_serializers import ExamenSerializer


class ExamenViewSet(viewsets.ModelViewSet):
    queryset = Examen.objects.select_related('subgrupo_cups').all()
    serializer_class = ExamenSerializer

    @list_route(methods=['get'])
    def examenes_entidad(self, request):
        id_entidad = request.GET.get('id_entidad')
        print(id_entidad)
        qs = self.get_queryset().filter(
            mis_entidades__entidad_id=id_entidad
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def buscar_x_parametro(self, request):
        parametro = request.GET.get('parametro')
        qs = None
        if len(parametro) > 0:
            qs = self.get_queryset().filter(
                nombre__icontains=parametro
            ).distinct()
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
