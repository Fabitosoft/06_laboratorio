from django.db import models
from model_utils.models import TimeStampedModel

from ordenes.models import OrdenExamen


class Biopsia(TimeStampedModel):
    orden_examen = models.OneToOneField(OrdenExamen, related_name='mi_biopsia')
    descripcion_macroscopica = models.TextField(null=True, blank=True)
    descripcion_microscopica = models.TextField(null=True, blank=True)
    diagnostico = models.TextField(null=True, blank=True)


class Citologia(TimeStampedModel):
    orden_examen = models.OneToOneField(OrdenExamen, related_name='mi_citologia')
    # Calidad de la muestra
    es_insatisfactoria = models.BooleanField(default=False)
    debe_repetir = models.BooleanField(default=False)

    con_componente_endocervical = models.BooleanField(default=False)
    celularidad_escasa = models.BooleanField(default=False)
    mala_tincion = models.BooleanField(default=False)
    hemorragico = models.BooleanField(default=False)
    mala_fijacion = models.BooleanField(default=False)
    fondo_con_leucocitos = models.BooleanField(default=False)

    # Microorganismos Presentes
    trichomonas = models.BooleanField(default=False)
    herpes = models.BooleanField(default=False)
    candida_sp = models.BooleanField(default=False)
    vaginosis_bacteriana = models.BooleanField(default=False)
    flora_anormal = models.BooleanField(default=False)
    actinomyces = models.BooleanField(default=False)

    nega_les_intraepi_malig = models.BooleanField(default=False,
                                                  help_text='Negativo para Lesión intraepitelial o malignidad')

    camb_react_secu = models.BooleanField(default=False, help_text='Cambios Reactivos Secundarios')
    reparacion = models.BooleanField(default=False)
    inflamacion = models.BooleanField(default=False)
    atrofia = models.BooleanField(default=False)
    diu = models.BooleanField(default=False)
    otro = models.BooleanField(default=False)

    camb_ind_papiloma = models.BooleanField(default=False, help_text='Cambios inducidos por papiloma')

    anor_epi_esca_nat_ind = models.BooleanField(default=False,
                                                help_text='Anormalidad del Epitelio Escamoso de naturaleza indeterminada')
    asc_us = models.BooleanField(default=False)
    asc_h = models.BooleanField(default=False)

    nci_i = models.BooleanField(default=False,
                                help_text='Lesión escamosa intraepitelial de bajo grado (displasia leve NIC. I)')

    # Lesión escamosa intraepitelial de alto grado
    les_esc_intr_alto_grado = models.BooleanField(default=False,
                                                  help_text='Lesión escamosa intraepitelial de alto grado')
    nci_ii = models.BooleanField(default=False, help_text='(Displacia moderada NIC II)')
    nci_iii = models.BooleanField(default=False, help_text='(Displacia severa /Carcinoma in situ NIC III)')

    carc_esca_inv = models.BooleanField(default=False, help_text='Carcinoma escamocelular invasivo')

    anor_epi_glan_nat_inde = models.BooleanField(default=False,
                                                 help_text='Anomalidades del epitelio glandular de naturaleza indeterminada')

    adenocarcinoma = models.BooleanField(default=False, help_text='Adenocarcinoma')
