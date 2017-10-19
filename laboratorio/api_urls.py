from .api_routers import DefaultRouter

# Routers provide an easy way of automatically determining the URL conf.
from ordenes.urls import router as ordenes_router

router = DefaultRouter()
router.extend(ordenes_router)

