# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-01-13 14:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0033_auto_20180112_1014'),
    ]

    operations = [
        migrations.AddField(
            model_name='ordenexamen',
            name='especial',
            field=models.BooleanField(default=False, verbose_name='Plantilla Especial'),
        ),
        migrations.AddField(
            model_name='ordenexamen',
            name='nro_plantilla',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Nro. Plantilla Especial'),
        ),
    ]
