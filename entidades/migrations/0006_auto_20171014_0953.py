# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-14 14:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entidades', '0005_auto_20171014_0946'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entidad',
            name='nit',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
