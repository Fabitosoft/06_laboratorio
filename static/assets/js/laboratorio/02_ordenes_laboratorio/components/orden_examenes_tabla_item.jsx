import React, {Component} from 'react';
import {formatMoney} from 'accounting';
import {Link} from 'react-router-dom';

export default class OrdenExamenesTablaItem extends Component {
    constructor(props) {
        super(props);
        this.state = ({descuento: 0, imprimir: false})
    }

    componentDidMount() {
        const {examen: {descuento}} = this.props;
        this.setState({descuento});
    }

    renderEliminar() {
        const {
            examen,
            eliminarExamen,
            orden,
            examen: {examen_estado_nombre, examen_estado}
        } = this.props;
        const link_to = `/app/orden_examen/editar/${examen.id}`;
        if (orden.estado === 0) {
            return (
                <a onClick={() => {
                    eliminarExamen(examen)
                }}>
                    <i className="fa fa-minus-square" aria-hidden="true"></i></a>
            )
        } else {
            return (
                <span>{examen_estado === 2 || examen_estado === 3 ?
                    <Link to={link_to}>{examen_estado_nombre}</Link> : examen_estado_nombre}</span>
            )
        }
    }

    renderImprimir() {
        const {
            orden,
            examen: {examen_estado, id},
            addImprimir,
            removeImprimir
        } = this.props;
        const {imprimir} = this.state;
        if (orden.estado === 1 && (examen_estado === 2 || examen_estado === 3)) {
            return (
                <i
                    className={`fa ${imprimir ? 'fa-check-square' : 'fa-square-o'}`}
                    aria-hidden="true"
                    onClick={() => {
                        if (imprimir) {
                            removeImprimir(id);
                        } else {
                            addImprimir(id);
                        }
                        this.setState({imprimir: !imprimir});
                    }
                    }
                />
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
        const {examen} = this.props;
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
                <td scope="row">
                    {this.renderImprimir()}
                </td>
            </tr>
        )
    }
}