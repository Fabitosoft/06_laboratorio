from rest_framework import routers
from .api_views import (
    ExamenViewSet
)

router = routers.DefaultRouter()
router.register(r'examenes', ExamenViewSet)
