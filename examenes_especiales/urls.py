from rest_framework import routers
from .api_views import (
    BiopsiaViewSet,
    CitologiaViewSet
)

router = routers.DefaultRouter()
router.register(r'examenes_especiales_biopsia', BiopsiaViewSet)
router.register(r'examenes_especiales_citologia', CitologiaViewSet)
