import React, {Component} from 'react';
import {connect} from 'react-redux';
import TablaItemExamenes from './entidades_editar_examenes_tabla_item';

export default class TablaExamenes extends Component {
    render() {
        const {examenes, traerEntidad, actualizarExamenEntidad} = this.props;
        return (
            <div>
                <table className="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Codigo Cup</th>
                        <th>Examen Nombre</th>
                        <th>Valor</th>
                        <th>Costo Ref.</th>
                        <th>Activo</th>
                        <th>Checkeo Precio</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        examenes.sort((a, b) => {
                            return a.id - b.id
                        }).map(examen => {
                            return <TablaItemExamenes
                                key={examen.id}
                                examen={examen}
                                actualizarExamenEntidad={actualizarExamenEntidad}
                                traerEntidad={traerEntidad}
                            />
                        })
                    }
                    </tbody>
                </table>
            </div>

        )
    }
}