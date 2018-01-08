import React, {Component} from 'react';
import PrintTemplate from 'react-print';
import ImpresionCabezote from '../../components/impresion/cabezote';
import ImpresionCabezoteDatosGeneralesRecibo from '../../components/impresion/cabezote_datos_generales_recibo';
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
            paciente
        } = this.props;
        if (!entidad) {
            return (
                <div></div>
            )
        }
        return (
            <PrintTemplate>
                <div className="impresion-orden-laboratorio">
                    <ImpresionCabezote/>
                    <div className="orden mt-2">
                        <div className="row datos-generales">
                            <ImpresionCabezoteDatosGeneralesRecibo
                                orden={orden}
                                entidad={entidad}
                                medico_remitente={medico_remitente}
                                paciente={paciente}
                            />
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