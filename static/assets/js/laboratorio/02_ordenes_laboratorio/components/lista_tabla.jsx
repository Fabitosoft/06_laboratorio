import React, {Component} from 'react';
import moment from 'moment-timezone';
import {Link} from 'react-router-dom';

moment.tz.setDefault("America/Bogota");
moment.locale('es');

export default class TablaLista extends Component {

    renderItemTabla(orden) {
        const fecha_orden = moment.tz(orden.created, "America/Bogota").format('MMMM D YYYY, HH:mm:ss');
        const link_to = `/app/ordenes_laboratorio/detail/${orden.id}`;

        const examenes_calificados = orden.mis_examenes.filter(examen => {
            return examen.examen_estado === 2 || examen.examen_estado === 3
        });

        const porcentaje_calificados = `${Math.round((examenes_calificados.length / orden.mis_examenes.length) * 100)}%`;

        return (
            <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.paciente_nombre}</td>
                <td>{fecha_orden}</td>
                <td>{orden.estado_nombre}</td>
                <td>{porcentaje_calificados}</td>
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
                        Estado
                    </th>
                    <th>
                        Calificado
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