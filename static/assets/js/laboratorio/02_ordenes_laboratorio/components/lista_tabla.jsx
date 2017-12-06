import React, {Component} from 'react';
import moment from 'moment-timezone';
import {Link} from 'react-router-dom';

moment.tz.setDefault("America/Bogota");
moment.locale('es');

export default class TablaLista extends Component {

    renderItemTabla(orden) {
        const fecha_orden = moment.tz(orden.created, "America/Bogota").format('MMMM D YYYY, HH:mm:ss');
        const link_to = `/app/ordenes_laboratorio/detail/${orden.id}`;
        return (
            <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.paciente_nombre}</td>
                <td>{fecha_orden}</td>
                <td><Link to={link_to}>Ver</Link></td>
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
                    <th>

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