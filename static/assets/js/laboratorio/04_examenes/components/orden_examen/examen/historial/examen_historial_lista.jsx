import React, {Component} from 'react';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");

export default class ExamenHistorialLista extends Component {
    renderItemBitacora(item) {
        const {
            generado_por,
            resultado,
            tipo_bitacora,
            modified,
            examen_unidad_medida,
            examen_valor_referencia,
            examen_estado,
            tecnica
        } = item;
        const modificado = moment(modified, "YYYY MM DD HH:mm:ss", "es").tz('America/Bogota');
        return (
            <tr key={item.id}>
                <td>{tipo_bitacora}</td>
                <td>{generado_por}</td>
                <td>{modificado.format("DD MMMM YYYY")}</td>
                <td>{modificado.format("hh:mm:ss a")}</td>
                <td>{examen_estado}</td>
                <td>{tecnica}</td>
                <td>{resultado}</td>
                <td>{examen_unidad_medida}</td>
                <td><p className='text-multiline'>{examen_valor_referencia}</p></td>
            </tr>
        )
    }


    render() {
        const {mis_bitacoras} = this.props;
        return (
            <table className="table table-responsive table-striped">
                <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Técnica</th>
                    <th>Resultado</th>
                    <th>Unidad</th>
                    <th>Vlr. Referencia</th>
                </tr>
                </thead>
                <tbody>
                {mis_bitacoras.sort((a, b) => {
                    return (b.id - a.id)
                }).map(item => {
                    return this.renderItemBitacora(item)
                })}
                </tbody>
            </table>
        )
    }
}