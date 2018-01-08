import React, {Component} from 'react';
import {formatMoney} from 'accounting';

import OrdenExamenesTablaItem from './orden_examenes_tabla_item';

export default class OrdenExamenesTabla extends Component {
    render() {
        const {
            orden,
            orden: {mis_examenes},
            eliminarExamen,
            cambiarDescuento,
            addImprimir,
            removeImprimir
        } = this.props;
        return (
            <div className="col-12">
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Valor</th>
                        <th scope="col">% Descuento</th>
                        <th scope="col">Valor Descuento</th>
                        <th scope="col">Valor Final</th>
                        <th scope="col">{orden.estado === 0 ? "Eliminar" : "Estado"}</th>
                        {orden.estado === 1 ? <th scope="col">Imprimir</th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {mis_examenes.sort((a, b) => {
                        return a.id - b.id
                    }).map((examen) => {
                        return (
                            <OrdenExamenesTablaItem
                                orden={orden}
                                key={examen.id}
                                examen={examen}
                                eliminarExamen={eliminarExamen}
                                cambiarDescuento={cambiarDescuento}
                                removeImprimir={removeImprimir}
                                addImprimir={addImprimir}
                            />
                        )
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>Valor Total</td>
                        <td>{formatMoney(Number(orden.valor_total), "$", 0, ".", ",")}</td>
                        <td></td>
                        <td>{formatMoney(Number(orden.valor_descuento), "$", 0, ".", ",")}</td>
                        <td>{formatMoney(Number(orden.valor_final), "$", 0, ".", ",")}</td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}