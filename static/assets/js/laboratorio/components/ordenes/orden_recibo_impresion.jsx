import React, {Component} from 'react';
import PrintTemplate from 'react-print';
import ImpresionCabezote from '../../components/impresion/cabezote';
import {formatMoney} from 'accounting';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");

export default class OrdenImpresionRecibo extends Component {

    renderExamenItem(examen) {
        const {examen_codigo_cups, examen_nombre, valor_total, valor_descuento, valor_final, id} = examen;
        return (
            <tr key={id}>
                <td>{examen_codigo_cups}</td>
                <td>{examen_nombre}</td>
                <td>{formatMoney(Number(valor_total), "$", 0, ".", ",")}</td>
                <td>{formatMoney(Number(valor_descuento), "$", 0, ".", ",")}</td>
                <td>{formatMoney(Number(valor_final), "$", 0, ".", ",")}</td>
            </tr>
        )
    }

    render() {
        const {
            orden,
            orden: {mis_examenes},
            entidad,
            medico_remitente,
            tipo_pago,
            paciente
        } = this.props;
        if (!entidad) {
            return (
                <div></div>
            )
        }

        const fechaOrden = moment(orden.created, "YYYY MM DD HH:mm:ss", "es").tz('America/Bogota');


        const fecha_nacimiento = moment(paciente.fecha_nacimiento, "YYYY MM DD", "es").tz('America/Bogota');
        const diferencia = fechaOrden.diff(fecha_nacimiento, "years");

        let mi_medico_remitente = null;
        if (medico_remitente) {
            mi_medico_remitente = <div className="col-6">
                <strong>Médico Remitente: </strong>
                {medico_remitente.nombres}
            </div>
        }
        return (
            <PrintTemplate>
                <div className="impresion ">
                    <ImpresionCabezote/>
                    <div className="orden mt-2">
                        <div className="row datos-generales">
                            <div className="col-2">
                                <strong>Nro: </strong>
                                {orden.id}
                            </div>
                            <div className="col-3">
                                <strong>Fecha: </strong>
                                {fechaOrden.format("DD MMMM YYYY")}
                            </div>
                            <div className="col-2">
                                <strong>Hora: </strong>
                                {fechaOrden.format("hh:mm:ss a")}
                            </div>
                            <div className="col-4">
                                <strong>Forma de Pago: </strong>
                                {tipo_pago}
                            </div>
                            <div className="col-4">
                                <strong>Paciente: </strong>
                                {`${paciente.nombre} ${paciente.nombre_segundo} ${paciente.apellido} ${paciente.apellido_segundo}`}
                            </div>
                            <div className="col-3">
                                <strong>Id: </strong>
                                {paciente.tipo_documento} - {paciente.nro_identificacion}
                            </div>
                            <div className="col-2">
                                <strong>Edad: </strong>
                                {diferencia}
                            </div>
                            <div className="col-3">
                                <strong>Teléfono: </strong>
                                {paciente.telefono}
                            </div>
                            <div className="col-6">
                                <strong>Entidad: </strong>
                                {entidad.nombre}
                            </div>
                            {mi_medico_remitente}
                            <div className="col-12">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Val.</th>
                                        <th>Val. Des</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {mis_examenes.map(examen => {
                                        return this.renderExamenItem(examen)
                                    })}
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td>Total:</td>
                                        <td></td>
                                        <td>{formatMoney(Number(orden.valor_total), "$", 0, ".", ",")}</td>
                                        <td>{formatMoney(Number(orden.valor_descuento), "$", 0, ".", ",")}</td>
                                        <td>{formatMoney(Number(orden.valor_final), "$", 0, ".", ",")}</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="col-12">
                                <strong>Elaborado Por: </strong>
                                {orden.cajero}
                            </div>
                        </div>
                    </div>
                </div>
            </PrintTemplate>
        )
    }
}