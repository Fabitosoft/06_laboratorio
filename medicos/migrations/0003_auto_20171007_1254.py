# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-07 17:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('medicos', '0002_auto_20171007_1237'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='especialista',
            options={'verbose_name': 'Especialista', 'verbose_name_plural': 'Especialistas'},
        ),
        migrations.AlterModelOptions(
            name='medicoremitente',
            options={'verbose_name': 'Médico Remitente', 'verbose_name_plural': 'Médicos Remitentes'},
        ),
    ]
