# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-06 13:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('medicos', '0014_auto_20180106_0743'),
        ('ordenes', '0030_auto_20180106_0743'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordenexamen',
            name='especialista_firma',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='mis_examenes_firmados_sencillos', to='medicos.Especialista'),
        ),
    ]
