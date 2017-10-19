from rest_framework import routers
from .api_views import (
    OrdenViewSet
)

router = routers.DefaultRouter()
router.register(r'ordenes', OrdenViewSet)
