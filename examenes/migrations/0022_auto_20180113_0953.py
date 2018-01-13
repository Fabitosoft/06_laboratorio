# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-13 14:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examenes', '0021_remove_examen_especialista_firma'),
    ]

    operations = [
        migrations.AlterField(
            model_name='examen',
            name='nro_plantilla',
            field=models.PositiveIntegerField(blank=True, choices=[(1, 'Biopsia')], null=True, verbose_name='Nro. Plantilla Especial'),
        ),
    ]
