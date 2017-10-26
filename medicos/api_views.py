from .models import MedicoRemitente
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from django.db.models import Q

from .api_serializers import MedicoRemitenteSerializer


class MedicoRemitenteViewSet(viewsets.ModelViewSet):
    queryset = MedicoRemitente.objects.all()
    serializer_class = MedicoRemitenteSerializer

    @list_route(methods=['get'])
    def buscar_nombre(self, request):
        parametro = request.GET.get('parametro')
        qs = MedicoRemitente.objects.filter(
            Q(nombres__icontains=parametro) |
            Q(apellidos__icontains=parametro)
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
