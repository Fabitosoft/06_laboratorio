# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-14 15:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medicos', '0004_auto_20171014_1007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='especialista',
            name='identificacion',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
