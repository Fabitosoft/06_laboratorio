from .models import MedicoRemitente
from rest_framework import viewsets

from .api_serializers import MedicoRemitenteSerializer


class MedicoRemitenteViewSet(viewsets.ModelViewSet):
    queryset = MedicoRemitente.objects.all()
    serializer_class = MedicoRemitenteSerializer
