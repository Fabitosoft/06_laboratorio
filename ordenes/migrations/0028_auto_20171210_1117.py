# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-12-10 16:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0027_auto_20171209_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historialordenexamen',
            name='examen_estado',
            field=models.CharField(max_length=100),
        ),
    ]