# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-07 16:58
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('examenes', '0003_auto_20171007_1124'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='examen',
            options={'verbose_name': 'Examen', 'verbose_name_plural': 'Examenes'},
        ),
        migrations.RenameField(
            model_name='examen',
            old_name='codico_cups',
            new_name='codigo_cups',
        ),
    ]
