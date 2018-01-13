# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-13 16:06
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('examenes_especiales', '0003_auto_20180113_1106'),
    ]

    operations = [
        migrations.AlterField(
            model_name='biopsia',
            name='orden_examen',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='mi_biopsia', to='ordenes.OrdenExamen'),
        ),
    ]
