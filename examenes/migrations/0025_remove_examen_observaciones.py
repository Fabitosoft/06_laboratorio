# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-03 13:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('examenes', '0024_examen_observaciones'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='examen',
            name='observaciones',
        ),
    ]
