from .models import Orden
from rest_framework import viewsets

from .api_serializers import OrdenSerializer


class OrdenViewSet(viewsets.ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer
