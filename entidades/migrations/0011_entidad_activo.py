# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-20 16:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entidades', '0010_auto_20171026_1715'),
    ]

    operations = [
        migrations.AddField(
            model_name='entidad',
            name='activo',
            field=models.BooleanField(default=True),
        ),
    ]
