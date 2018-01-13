from .api_routers import DefaultRouter

# Routers provide an easy way of automatically determining the URL conf.
from ordenes.urls import router as ordenes_router
from pacientes.urls import router as pacientes_router
from entidades.urls import router as entidades_router
from medicos.urls import router as medicos_router
from examenes.urls import router as examenes_router
from permisos.urls import router as permisos_router

router = DefaultRouter()
router.extend(ordenes_router)
router.extend(pacientes_router)
router.extend(entidades_router)
router.extend(medicos_router)
router.extend(examenes_router)
router.extend(permisos_router)
