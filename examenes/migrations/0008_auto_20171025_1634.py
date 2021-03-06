# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-10-25 21:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('entidades', '0006_auto_20171014_0953'),
        ('examenes', '0007_auto_20171025_1624'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExamenEntidad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valor_examen', models.DecimalField(decimal_places=1, default=0, max_digits=10, verbose_name='Valor del Examen')),
                ('entidad', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='entidades.Entidad')),
            ],
        ),
        migrations.AlterField(
            model_name='examen',
            name='costo_referencia',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=10, verbose_name='Costo Referencia del Examen'),
        ),
        migrations.AddField(
            model_name='examenentidad',
            name='examen',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='examenes.Examen'),
        ),
        migrations.AddField(
            model_name='examen',
            name='entidades',
            field=models.ManyToManyField(through='examenes.ExamenEntidad', to='entidades.Entidad'),
        ),
    ]
