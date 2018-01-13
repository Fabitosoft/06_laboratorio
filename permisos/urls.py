from rest_framework import routers
from .api_views import (
    PermisosViewSet
)

router = routers.DefaultRouter()
router.register(r'permisos', PermisosViewSet)
