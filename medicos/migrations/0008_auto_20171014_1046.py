# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-14 15:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicos', '0007_medicoremitente_especialidad_temporal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medicoremitente',
            name='apellidos',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
        migrations.AlterField(
            model_name='medicoremitente',
            name='nombres',
            field=models.CharField(max_length=200),
        ),
    ]
