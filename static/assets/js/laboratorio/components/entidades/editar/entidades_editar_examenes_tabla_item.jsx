import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatMoney} from 'accounting';

export default class TablaItemExamenes extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            editando: false,
            valor_examen_campo: 0
        })
    }

    render() {
        const {
            examen,
            examen: {
                id,
                examen_id,
                examen_codigo_cups,
                examen_nombre,
                valor_examen,
                examen_costo_referencia,
                activo,
                entidad
            }
        } = this.props;
        const {actualizarExamenEntidad, traerEntidad} = this.props;
        let es_activo = null;
        if (activo) {
            es_activo = <i
                className="fa fa-check-square"
                aria-hidden="true"
                onClick={() => {
                    actualizarExamenEntidad({...examen, activo: false}, () => {
                        traerEntidad(entidad);
                    })
                }
                }
            />
        } else {
            es_activo = <i
                className="fa fa-square-o"
                aria-hidden="true"
                onClick={() => {
                    actualizarExamenEntidad({...examen, activo: true}, () => {
                        traerEntidad(entidad);
                    })
                }
                }
            />
        }

        const {editando, valor_examen_campo} = this.state;
        let valor =
            <div onClick={() => {
                this.setState({
                    editando: !this.state.editando,
                    valor_examen_campo: valor_examen
                })
            }}>
                {formatMoney(Number(valor_examen), "$", 0, ".", ",")}
            </div>;
        if (editando) {
            valor =
                <input
                    onChange={e => {
                        this.setState({valor_examen_campo: e.target.value})
                    }}
                    onBlur={(e) => {
                        this.setState({editando: !this.state.editando})
                        const examen_entidad = {...examen, valor_examen: parseFloat(valor_examen_campo)}
                        actualizarExamenEntidad(examen_entidad, () => {
                            traerEntidad(entidad)
                        })
                    }}
                    type="text"
                    value={valor_examen_campo}
                />

        }

        return (
            <tr key={id}>
                <td>{examen_id}</td>
                <td>{examen_codigo_cups}</td>
                <td>{examen_nombre}</td>
                <td>
                    {valor}
                </td>
                <td>{formatMoney(Number(examen_costo_referencia), "$", 0, ".", ",")}</td>
                <td>{es_activo}</td>
                <td>
                    {
                        parseFloat(valor_examen) > parseFloat(examen_costo_referencia) ?
                            <i className="fa fa-check" aria-hidden="true"></i> :
                            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    }
                </td>
            </tr>
        )
    }
}