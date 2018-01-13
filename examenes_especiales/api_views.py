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
        orden_examen.modificado_por = self.request.user
        if biopsia.descripcion_macroscopica and biopsia.diagnostico:
            orden_examen.resultado = "Con Resultado de Biopsia"
        else:
            orden_examen.resultado = None
        orden_examen.save()


class CitologiaViewSet(viewsets.ModelViewSet):
    queryset = Citologia.objects.all()
    serializer_class = CitologiaSerializer

    def perform_update(self, serializer):
        super().perform_update(serializer)
        citologia = self.get_object()
        if not citologia.camb_react_secu:
            citologia.reparacion = False
            citologia.inflamacion = False
            citologia.atrofia = False
            citologia.diu = False
            citologia.otro = False
        citologia.save()

        con_resultado = False

        for f in citologia._meta.get_fields():
            if getattr(citologia, f.name) == True and f.name != 'id':
                con_resultado = True

        orden_examen = citologia.orden_examen
        orden_examen.modificado_por = self.request.user
        if con_resultado:
            orden_examen.resultado = "Con Resultado de Citología"
        else:
            orden_examen.resultado = None
        orden_examen.save()
