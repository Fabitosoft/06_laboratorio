import React, {Component} from 'react';
import {formatMoney} from 'accounting';

export default class OrdenExamenesTablaItem extends Component {
    constructor(props) {
        super(props);
        this.state = ({descuento: 0})
    }

    componentDidMount() {
        const {examen: {descuento}} = this.props;
        this.setState({descuento});
    }

    renderEliminar() {
        const {examen, eliminarExamen, orden} = this.props;
        if (orden.estado === 0) {
            return (
                <a onClick={() => {
                    eliminarExamen(examen)
                }}>
                    <i className="fa fa-minus-square" aria-hidden="true"></i></a>
            )
        }
    }

    renderDescuento() {
        const {examen, cambiarDescuento, orden} = this.props;
        if (orden.estado === 0) {
            return (
                <input
                    onChange={e => {
                        this.setState({descuento: e.target.value})
                    }}
                    onBlur={(e) => {
                        cambiarDescuento(examen, this.state.descuento)
                    }}
                    type="text"
                    value={this.state.descuento}
                />
            )
        } else {
            return (
                <div>{(examen.valor_descuento / examen.valor_total) * 100}%</div>
            )
        }
    }

    render() {
        const {cambiarDescuento, examen} = this.props;
        return (
            <tr>
                <td scope="row">{examen.examen_nombre}</td>
                <td scope="row">{formatMoney(Number(examen.valor_total), "$", 0, ".", ",")}</td>
                <td scope="row">
                    {this.renderDescuento()}
                </td>
                <td scope="row">{formatMoney(Number(examen.valor_descuento), "$", 0, ".", ",")}</td>
                <td scope="row">{formatMoney(Number(examen.valor_final), "$", 0, ".", ",")}</td>
                <td scope="row">
                    {this.renderEliminar()}
                </td>
            </tr>
        )
    }
}