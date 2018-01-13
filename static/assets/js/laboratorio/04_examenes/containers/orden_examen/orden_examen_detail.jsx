import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';
import {Link} from 'react-router-dom';

import OrdenExamenForm from '../../components/orden_examen/examen/orden_examen_form_editar';
import ExamenHistorialLista from '../../components/orden_examen/examen/historial/examen_historial_lista';

class OrdenExamenDetail extends Component {

    constructor(props) {
        super(props);
        this.state = (
            {
                ver_mas: false,
                ver_historial: false,
                ver_firmar_como: false,
                ver_firmar_como_activos: true
            }
        )
    }

    tienePermiso(permiso_nombre) {
        const {mis_permisos} = this.props;
        return mis_permisos.includes(permiso_nombre)
    }

    componentDidMount() {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const {
            match: {params: {id}},
            fetchOrdenExamen,
            fetchMiCuentaEspecialistaInfo,
            fetchEspecialistas,
            fetchMisPermisos
        } = this.props;

        fetchMiCuentaEspecialistaInfo();
        fetchEspecialistas();
        fetchMisPermisos();

        fetchOrdenExamen(id, () => {
            },
            error_callback
        );
    }

    renderCambiarEstado() {
        const {mas_opciones} = this.state;
        if (mas_opciones) {
            return (
                <div className={'row'}>
                    <div className="col-12 col-md-2">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            this.cambiarEstado(1)
                        }}>
                            Con Resultados
                        </button>
                    </div>
                </div>
            )
        }
    }

    cambiarEstado(estado) {
        const {
            orden_examen,
            updateOrdenExamen,
            fetchOrdenExamen,
            notificarAction
        } = this.props;

        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        updateOrdenExamen({...orden_examen, examen_estado: estado},
            response => {
                fetchOrdenExamen(
                    response.id, () => {
                        notificarAction('Se ha quitado verificadó el examen con éxito')
                    },
                    error_callback
                );
            },
            error_callback
        )
    }

    renderFirma(firma) {
        const {
            mi_cuenta_especialista,
            orden_examen,
            quitarFirmaOrdenExamen,
            fetchOrdenExamen,
            notificarAction
        } = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
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
                    {
                        (
                            mi_cuenta_especialista.id === firma.especialista
                            || this.tienePermiso("orden_examen_firmar_como")
                        ) &&
                        orden_examen.examen_estado !== 2 &&
                        <span
                            style={{position: "absolute", cursor: "pointer", bottom: "5px", right: "25px"}}
                            onClick={() => {
                                quitarFirmaOrdenExamen(
                                    orden_examen.id,
                                    firma.id,
                                    () => {
                                        fetchOrdenExamen(orden_examen.id, () => {
                                                notificarAction('Se ha retirado la firma correctamente')
                                            },
                                            error_callback
                                        );
                                    }
                                    , error_callback
                                )
                            }}
                        >x</span>
                    }
                </div>
            </div>
        )
    }

    renderFirmaDisponible(especialista) {
        const {
            firmarOrdenExamenComo,
            orden_examen,
            fetchOrdenExamen,
            notificarAction
        } = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        return (
            <div key={especialista.id}
                 className="col-12 col-md-4 col-lg-3 col-xl-2"
            >
                <div className="row text-center">
                    <div className="col-12">
                        <img className="img-fluid" src={especialista.firma_url} alt=""/>
                    </div>
                    <div className="col-12">
                        <h6>{especialista.full_name}</h6>
                        <h6>{especialista.especialidad_nombre}</h6>
                    </div>
                    <div className="col-12">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            firmarOrdenExamenComo(
                                orden_examen.id,
                                especialista.id,
                                () => {
                                    fetchOrdenExamen(orden_examen.id, () => {
                                            notificarAction('Se ha retirado la firma correctamente')
                                        },
                                        error_callback
                                    );
                                },
                                error_callback
                            )
                        }}>
                            Usar Firma
                        </button>
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
                                    this.setState({ver_mas: false})
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
        } else if (examen_estado === 2) {
            return (
                <button type="button" className="btn btn-primary" onClick={() => {
                    this.cambiarEstado(1)
                }}>
                    Quitar Verificado <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                </button>
            )
        }
    }

    renderVerMasOpciones() {
        const {ver_mas, ver_historial, ver_firmar_como, ver_firmar_como_activos} = this.state;
        const {orden_examen, especialistas} = this.props;
        const especialista_array = _.map(especialistas, (especialista => {
            return especialista
        }));

        const especialista_array_para_ver = especialista_array.filter(especialista => {
            return especialista.is_active === ver_firmar_como_activos
        });

        if (ver_mas) {
            return (
                <div className="row">
                    <div className="col-12 mt-2">
                        <button type="button" className="btn btn-primary" onClick={() => {
                            this.setState({ver_historial: !ver_historial})
                        }}>
                            {!ver_historial ? "Ver Historial" : "Ocultar Historial"}
                        </button>
                    </div>
                    {
                        ver_historial &&
                        <div className="col-12 mt-2"><ExamenHistorialLista mis_bitacoras={orden_examen.mis_bitacoras}/>
                        </div>
                    }

                    {
                        this.tienePermiso("orden_examen_firmar_como") &&
                        (orden_examen.multifirma ||
                            (!orden_examen.multifirma && orden_examen.mis_firmas.length === 0)) &&
                        <div className="col-12 mt-2">
                            <button type="button" className="btn btn-primary" onClick={() => {
                                this.setState({ver_firmar_como: !ver_firmar_como})
                            }}>
                                {!ver_firmar_como ? "Firmar Como..." : "Ocultar Firmar Como..."}
                            </button>
                        </div>
                    }

                    {
                        ver_firmar_como &&
                        <div className="col-12 mt-2"
                             style={{cursor: "pointer"}}
                             onClick={
                                 () => {
                                     this.setState({ver_firmar_como_activos: !ver_firmar_como_activos})
                                 }
                             }>{ver_firmar_como_activos ? 'Ver Inactivos' : 'Ver Activos'}</div>
                    }
                    {
                        ver_firmar_como &&
                        orden_examen.examen_estado !== 2 &&
                        especialistas &&
                        (
                            orden_examen.multifirma
                            ||
                            (!orden_examen.multifirma && orden_examen.mis_firmas.length === 0)
                        ) &&
                        <div className="col-12 mt-2">
                            <div className="row">
                                {especialista_array_para_ver.map(especialista => {
                                    return this.renderFirmaDisponible(especialista)
                                })}
                            </div>
                        </div>
                    }
                </div>
            )
        }

    }

    render() {
        const {orden_examen} = this.props;
        const {ver_mas} = this.state;
        if (!orden_examen)
            return (
                <div>
                    cargando...
                </div>
            );
        const link_to = `/app/ordenes_laboratorio/detail/${orden_examen.orden}`;
        return (
            <div className="row" id="react-no-print">
                <div className="col-12">
                    <h4>{orden_examen.examen_nombre}</h4>
                    <h6>{orden_examen.sub_categoria_cup_nombre.toUpperCase()}</h6>
                    <h6><strong>Entidad</strong>: {orden_examen.entidad_nombre}</h6>
                    <h6><strong>Paciente:</strong> {orden_examen.paciente_nombre}</h6>
                    <h6><strong>Orden:</strong> <Link to={link_to}>{orden_examen.orden}</Link></h6>
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
                    {this.tienePermiso("orden_examen_verificar") && this.renderVerificar()}
                </div>
                {
                    orden_examen.examen_estado === 1 &&
                    <div style={{cursor: "pointer"}}
                         className={'col-12 mt-2'}
                         onClick={() => {
                             this.setState({ver_mas: !ver_mas})
                         }}
                    >
                        {ver_mas ? 'Ver Menos...'
                            : 'Ver Más...'}
                    </div>
                }
                <div className="col-12 mt-2">
                    {this.renderVerMasOpciones()}
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        orden_examen: state.ordenes_examenes[id],
        mi_cuenta_especialista: state.mi_cuenta_especialista,
        especialistas: state.especialistas,
        mis_permisos: state.mis_permisos
    }
}

export default (connect(mapPropsToState, actions)(OrdenExamenDetail));
