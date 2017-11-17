import React, {Component} from 'react';
import {Field} from 'redux-form';
import moment from 'moment-timezone';

export default class TablaLista extends Component {

    renderItemTabla(orden) {
        const fecha_orden = moment.tz(orden.created, "America/Bogota").format('MMMM D YYYY, HH:mm:ss');
        return (
            <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.paciente_nombre}</td>
                <td>{fecha_orden}</td>
            </tr>
        )
    }

    render() {
        const {ordenes} = this.props;
        return (
            <table className="table table-responsive">
                <thead>
                <tr>
                    <th>
                        Nro.
                    </th>
                    <th>
                        Nombre Paciente
                    </th>
                    <th>
                        Fecha Creacion
                    </th>
                </tr>
                </thead>
                <tbody>
                {_.map(ordenes, orden => {
                    return this.renderItemTabla(orden)
                })
                }
                </tbody>
            </table>
        )
    }
}