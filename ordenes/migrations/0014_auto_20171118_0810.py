# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-18 13:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordenes', '0013_auto_20171118_0752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordenexamen',
            name='descuento',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=4),
        ),
    ]