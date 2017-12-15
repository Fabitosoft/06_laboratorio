import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';

import OrdenExamenForm from '../../components/orden_examen/examen/orden_examen_form_editar';
import ExamenHistorialLista from '../../components/orden_examen/examen/historial/examen_historial_lista';

class OrdenExamenDetail extends Component {

    constructor(props) {
        super(props);
        this.state = ({ver_historial: false})
    }

    componentDidMount() {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const {
            match: {params: {id}},
            fetchOrdenExamen,
            fetchMiCuentaEspecialistaInfo
        } = this.props;

        fetchMiCuentaEspecialistaInfo();

        fetchOrdenExamen(id, () => {
            },
            error_callback
        );
    }

    renderFirma(firma) {
        return (
            <div key={firma.id} className="col-12 col-md-4 col-lg-3 col-xl-2">
                <div className="row text-center">
                    <div className="col-12">
                        <img className="img-fluid" src={firma.firma_url} alt=""/>
                    </div>
                    <div className="col-12">
                        <h6>{firma.firmado_por}</h6>
                        <h6>{firma.especialidad}</h6>
                    </div>
                </div>
            </div>
        )
    }

    renderFormularioResultados() {
        const {
            orden_examen: {examen_estado},
            orden_examen,
            mi_cuenta_especialista
        } = this.props;

        if (examen_estado === 0 || examen_estado === 1) {
            return (
                <div className="col-12">
                    <OrdenExamenForm
                        mi_cuenta_especialista={mi_cuenta_especialista}
                        onSubmit={this.onSubmit.bind(this)}
                        orden_examen={orden_examen}
                        onFirmar={this.onFirmar.bind(this)}
                    />
                </div>
            )
        }
    }

    renderSoloResultado() {
        const {
            orden_examen: {
                resultado,
                examen_valor_referencia,
                tecnica,
                examen_estado,
                examen_unidad_medida
            }
        } = this.props;
        if (examen_estado === 2 || examen_estado === 3) {
            return (
                <div className="col-12 p-3">
                    <h4>Resultados</h4>
                    <div className="row">
                        <div className="col-4">
                            <h6>Valor de Referencia</h6>
                            <p className='text-multiline'>
                                {examen_valor_referencia}
                            </p>
                        </div>
                        <div className="col-4">
                            <h6>Resultado</h6>
                            <p className='text-multiline'>
                                {`${resultado} ${examen_unidad_medida}`}
                            </p>
                        </div>
                        <div className="col-4">
                            <h6>Técnica</h6>
                            <p className='text-multiline'>
                                {tecnica}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }

    }

    onFirmar() {
        const {match: {params: {id}}, firmarOrdenExamen, notificarAction, fetchOrdenExamen} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        firmarOrdenExamen(id,
            () => {
                notificarAction('Se ha firmado exitosamente el examen');
                fetchOrdenExamen(id, () => {
                    },
                    error_callback
                );
            },
            error_callback
        );
    }

    onSubmit(values) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const {updateOrdenExamen, notificarAction, fetchOrdenExamen} = this.props;

        updateOrdenExamen(values,
            response => {
                fetchOrdenExamen(
                    response.id, () => {
                        notificarAction('Se ha guardado correctamente los resultados del exámen');
                    },
                    error_callback
                );
            },
            error_callback
        );
    }

    renderVerificar() {
        const {
            orden_examen,
            orden_examen: {mis_firmas},
            orden_examen: {examen_estado},
            updateOrdenExamen,
            notificarAction,
            fetchOrdenExamen
        } = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        if (mis_firmas.length > 0 && examen_estado === 1) {
            return (
                <button type="button" className="btn btn-primary" onClick={() => {
                    updateOrdenExamen({...orden_examen, examen_estado: 2},
                        response => {
                            fetchOrdenExamen(
                                response.id, () => {
                                    notificarAction('Se ha verificadó el examen con éxito')
                                },
                                error_callback
                            );
                        },
                        error_callback
                    )
                }}>
                    Verificado <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                </button>
            )
        }
    }

    render() {
        const {orden_examen} = this.props;
        if (!orden_examen)
            return (
                <div>
                    cargando...
                </div>
            );

        return (
            <div className="row" id="react-no-print">
                <div className="col-12">
                    <h4>{orden_examen.examen_nombre}</h4>
                    <h6>{orden_examen.sub_categoria_cup_nombre.toUpperCase()}</h6>
                    <h6><strong>Entidad</strong>: {orden_examen.entidad_nombre}</h6>
                    <h6><strong>Paciente:</strong> {orden_examen.paciente_nombre}</h6>
                    <h6><strong>Orden:</strong> {orden_examen.orden}</h6>
                </div>
                {this.renderFormularioResultados()}
                {this.renderSoloResultado()}
                <div className="col-12">
                    <div className="row">
                        {orden_examen.mis_firmas.map(firma => {
                            return this.renderFirma(firma)
                        })}
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <button type="button" className="btn btn-primary" onClick={() => {
                        this.setState({ver_historial: !this.state.ver_historial})
                    }}>
                        {!this.state.ver_historial ? "Ver Historial" : "Ocultar Historial"}
                    </button>
                </div>
                <div className="col-12 mt-2">
                    {this.state.ver_historial ? <ExamenHistorialLista mis_bitacoras={orden_examen.mis_bitacoras}/> :
                        <div></div>}
                </div>
                <div className="col-12 mt-2">
                    {this.renderVerificar()}
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        orden_examen: state.ordenes_examenes[id],
        mi_cuenta_especialista: state.mi_cuenta_especialista
    }
}

export default (connect(mapPropsToState, actions)(OrdenExamenDetail));
