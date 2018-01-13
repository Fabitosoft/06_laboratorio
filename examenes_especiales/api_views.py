from django.db.models import Q
from rest_framework.decorators import list_route
from rest_framework.response import Response

from .models import Biopsia, Citologia
from rest_framework import viewsets

from .api_serializers import BiopsiaSerializer, CitologiaSerializer


class BiopsiaViewSet(viewsets.ModelViewSet):
    queryset = Biopsia.objects.all()
    serializer_class = BiopsiaSerializer

    def perform_update(self, serializer):
        super().perform_update(serializer)
        biopsia = self.get_object()
        orden_examen = biopsia.orden_examen
        if biopsia.descripcion_macroscopica and biopsia.diagnostico:
            orden_examen.resultado = "Con Resultado de Biopsia"
        else:
            orden_examen.resultado = None
        orden_examen.save()


class CitologiaViewSet(viewsets.ModelViewSet):
    queryset = Citologia.objects.all()
    serializer_class = CitologiaSerializer
