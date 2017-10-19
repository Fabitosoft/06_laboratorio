from .models import Entidad
from rest_framework import viewsets

from .api_serializers import EntidadSerializer


class EntidadViewSet(viewsets.ModelViewSet):
    queryset = Entidad.objects.all()
    serializer_class = EntidadSerializer
