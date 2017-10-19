from rest_framework import routers
from .api_views import (
    MedicoRemitenteViewSet
)

router = routers.DefaultRouter()
router.register(r'medicos_remitentes', MedicoRemitenteViewSet)
