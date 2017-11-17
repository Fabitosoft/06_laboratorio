import React, {Component} from 'react';
import {Field} from 'redux-form';
import {formatMoney} from 'accounting';

export default class TablaExamenesOrden extends Component {
    renderExamen(examen, index) {
        const {eliminarExamen, cambiarDescuento} = this.props;
        return (
            <tr key={index}>
                <td scope="row">{examen.nombre}</td>
                <td scope="row">{formatMoney(Number(examen.valor), "$", 0, ".", ",")}</td>
                <td scope="row"><input onChange={(e) => {
                    cambiarDescuento(index, e.target.value)
                }} type="text" value={examen.descuento}/></td>
                <td scope="row">{formatMoney(Number(examen.valor_descuento), "$", 0, ".", ",")}</td>
                <td scope="row">{formatMoney(Number(examen.valor_final), "$", 0, ".", ",")}</td>
                <td scope="row"><a onClick={() => {
                    eliminarExamen(index)
                }}>-</a></td>
            </tr>
        )
    }

    render() {
        const {examenesOrden, valor_total, valor_descuento, valor_final} = this.props;

        return (
            <div>
                <h3>Exámenes</h3>
                <table className='table table-striped'>
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Valor</th>
                        <th scope="col">% Descuento</th>
                        <th scope="col">Valor Descuento</th>
                        <th scope="col">Valor Final</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {examenesOrden.map((examen, index) => {
                        return this.renderExamen(examen, index)
                    })}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>Valor Total</td>
                        <td>{formatMoney(Number(valor_total), "$", 0, ".", ",")}</td>
                        <td></td>
                        <td>{formatMoney(Number(valor_descuento), "$", 0, ".", ",")}</td>
                        <td>{formatMoney(Number(valor_final), "$", 0, ".", ",")}</td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}