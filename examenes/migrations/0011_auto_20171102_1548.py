# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-02 20:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('examenes', '0010_examen_examen_grupo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='examen',
            name='examen_grupo',
            field=models.ManyToManyField(related_name='_examen_examen_grupo_+', to='examenes.Examen', verbose_name='mis_examenes'),
        ),
    ]
