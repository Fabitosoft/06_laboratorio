# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-18 20:51
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ordenes', '0016_auto_20171118_1055'),
    ]

    operations = [
        migrations.AddField(
            model_name='orden',
            name='elaborado_por',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='mis_ordenes_elaboradas', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='ordenexamen',
            name='examen_estado',
            field=models.PositiveIntegerField(choices=[(0, 'Creado'), (1, 'Con Resultados'), (2, 'Verificado'), (3, 'Impreso')], default=0),
        ),
    ]