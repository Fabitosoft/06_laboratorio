# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-09 20:57
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0021_ordenexamen_paciente_nombre'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ordenexamen',
            old_name='valor_referencia',
            new_name='examen_valor_referencia',
        ),
    ]