# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-03 13:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examenes', '0023_auto_20180113_1434'),
    ]

    operations = [
        migrations.AddField(
            model_name='examen',
            name='observaciones',
            field=models.TextField(blank=True, null=True),
        ),
    ]