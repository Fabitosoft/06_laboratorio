from rest_framework import routers
from .api_views import (
    EntidadViewSet
)

router = routers.DefaultRouter()
router.register(r'entidades', EntidadViewSet)
