import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';

import OrdenEditarForm from '../components/orden_form_editar';
import ExamenesOrden from '../components/orden_examenes';

import OrdenImpresionRecibo from '../components/orden_recibo_impresion';
import OrdenExamenesImpresionRecibo from '../components/orden_examenes_impresion';

class EditarOrdenLaboratorio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paciente: null,
            medico_remitente: null,
            entidad: null,
            searchText_entidad: "",
            searchText_paciente: "",
            searchText_medico_remitente: "",
            lista_imprimir: [],
            imprimirRecibo: false,
            imprimirExamenes: false,
            imprimirExamenesSeleccionados: false
        }
    }

    componentDidMount() {
        const {match: {params: {id}}} = this.props;
        const {fetchOrden, fetchEntidad, fetchMedicosRemitente, fetchPaciente} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };

        fetchOrden(id, orden => {
                fetchEntidad(orden.entidad, entidad => {
                    this.setState({entidad, searchText_entidad: entidad.nombre})
                });
                if (orden.medico_remitente) {
                    fetchMedicosRemitente(orden.medico_remitente, medico_remitente => {
                        this.setState({medico_remitente, searchText_medico_remitente: medico_remitente.full_name})
                    });
                }
                fetchPaciente(orden.paciente, paciente => {
                    this.setState({paciente, searchText_paciente: paciente.nro_identificacion})
                });
            },
            error_callback
        );
    }

    addImprimir(id_examen) {
        this.setState({
            lista_imprimir: [...this.state.lista_imprimir, id_examen],
            imprimirRecibo: false,
            imprimirExamenes: false,
            imprimirExamenesSeleccionados: false
        });
    }

    removeImprimir(id_examen) {
        const index = this.state.lista_imprimir.findIndex(element => {
            return element === id_examen
        });
        this.setState({
            lista_imprimir: [
                ...this.state.lista_imprimir.slice(0, index),
                ...this.state.lista_imprimir.slice(index + 1)
            ],
            imprimirRecibo: false,
            imprimirExamenes: false,
            imprimirExamenesSeleccionados: false
        });
    }

    onSubmit(values) {
        const {updateOrden, notificarAction, fetchOrden} = this.props;
        const {paciente, entidad, medico_remitente} = this.state;
        let orden_editada = {
            ...values,
            paciente: paciente.id,
            entidad: entidad.id
        };
        if (medico_remitente) {
            orden_editada = {...orden_editada, medico_remitente: medico_remitente.id};
        }

        const callback = (response) => {
            fetchOrden(response.id, orden => {
                notificarAction(`Se ha actualizado la orden de laboratorio nro: ${orden.id}`);
            })
        };
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };

        updateOrden(orden_editada, callback, error_callback)
    }

    adicionarExamen(examen) {
        const {match: {params: {id}}, createOrdenExamen, fetchOrden, notificarAction, orden} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const examen_orden = {
            ...examen,
            examen: examen.examen_id,
            valor_total: parseFloat(examen.valor_examen),
            paciente_nombre: orden.paciente_nombre,
            orden: id,
            descuento: 0,
            valor_descuento: 0,
            valor_final: parseFloat(examen.valor_examen)
        };

        createOrdenExamen(
            examen_orden,
            response => {
                notificarAction(`Se há adicionado correctamente el examen ${response.examen_nombre}`);
                fetchOrden(response.orden);
            },
            error_callback
        );
    }

    cambiarDescuento(examen, porcentaje) {
        const {fetchOrden, updateOrdenExamen, notificarAction} = this.props;
        const {orden} = examen;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        examen.descuento = parseFloat(porcentaje);
        examen.valor_descuento = (examen.valor_total * (porcentaje / 100));
        examen.valor_final = examen.valor_total - examen.valor_descuento;

        updateOrdenExamen(examen,
            response => {
                notificarAction(`Se ha asignado correctamente el descuento al examen ${response.examen_nombre}`);
                fetchOrden(orden);
            },
            error_callback
        )
    }

    eliminarExamen(examen) {
        const {deleteOrdenExamen, fetchOrden} = this.props;
        const {orden} = examen;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };

        deleteOrdenExamen(examen.id, response => {
                fetchOrden(orden, orden_laboratorio => {
                    this.calcularTotales(orden_laboratorio);
                });
            },
            error_callback
        );
    }

    renderExamenes() {
        const {match: {params: {id}}, orden} = this.props;
        if (id) {
            const {entidad} = this.state;
            if (entidad) {
                return (
                    <ExamenesOrden
                        examenes={entidad.mis_examenes}
                        adicionarExamen={this.adicionarExamen.bind(this)}
                        eliminarExamen={this.eliminarExamen.bind(this)}
                        cambiarDescuento={this.cambiarDescuento.bind(this)}
                        orden={orden}
                        addImprimir={this.addImprimir.bind(this)}
                        removeImprimir={this.removeImprimir.bind(this)}
                    />
                )
            }
        }
    }

    renderBotonDescartar() {
        const {deleteOrden, notificarAction, match: {params: {id}}, orden, orden: {estado}} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        if (orden && estado === 0) {
            return (
                <button
                    type="button"
                    className='btn btn-warning m-2'
                    onClick={
                        () => {
                            deleteOrden(id, response => {
                                    notificarAction(`Se ha eliminado Correctamente la Orden Nr. ${id}`);
                                    this.props.history.push(`/app/ordenes_laboratorio/lista/`);
                                },
                                error_callback
                            );
                        }
                    }>
                    Descartar
                </button>
            )
        }
    }

    renderBotonPagado() {
        const {orden, updateOrden, fetchOrden, orden: {mis_examenes, estado}} = this.props;
        if (orden && estado === 0 && mis_examenes.length > 0) {
            return (
                <button
                    type="button"
                    className='btn btn-primary m-2'
                    onClick={
                        () => {
                            updateOrden({...orden, estado: 1}, response => {
                                fetchOrden(orden.id, orden_laboratorio => {
                                    this.setState({orden_laboratorio})
                                });
                            });
                        }
                    }>
                    Pagado
                </button>
            )
        }
    }

    renderBotonImprimir() {
        const {orden, orden: {mis_examenes}} = this.props;
        const {imprimirRecibo, imprimirExamenes, imprimirExamenesSeleccionados} = this.state;
        const mis_examenes_para_imprimir = mis_examenes.filter(examen => {
            return (examen.examen_estado === 2 || examen.examen_estado === 3)
        });
        const {lista_imprimir: {length}} = this.state;
        if (orden && orden.estado === 1) {
            return (
                <div className="col-12">
                    <button
                        type="button"
                        className={`btn ${imprimirRecibo ? 'btn-warning' : 'btn-primary'} p-1 m-1`}
                        onClick={
                            () => {
                                if (!imprimirRecibo) {
                                    this.setState({
                                        imprimirRecibo: true,
                                        imprimirExamenes: false,
                                        imprimirExamenesSeleccionados: false
                                    });
                                } else {
                                    print();
                                    this.setState({
                                        imprimirRecibo: false,
                                        imprimirExamenes: false,
                                        imprimirExamenesSeleccionados: false
                                    });
                                }
                            }
                        }>
                        <i className="fa fa-print" aria-hidden="true"> Recibo</i>
                    </button>
                    {mis_examenes_para_imprimir.length > 0 &&
                    <button
                        type="button"
                        className={`btn ${imprimirExamenes ? 'btn-warning' : 'btn-primary'} p-1 m-1`}
                        onClick={
                            () => {
                                if (!imprimirExamenes) {
                                    this.setState({
                                        imprimirRecibo: false,
                                        imprimirExamenes: true,
                                        imprimirExamenesSeleccionados: false
                                    });
                                } else {
                                    print();
                                    this.setState({
                                        imprimirRecibo: false,
                                        imprimirExamenes: false,
                                        imprimirExamenesSeleccionados: false
                                    });
                                }
                            }
                        }>
                        <i className="fa fa-print" aria-hidden="true"> Exámenes</i>
                    </button>
                    }
                    {length > 0 &&
                    <button
                        type="button"
                        className={`btn ${imprimirExamenesSeleccionados ? 'btn-warning' : 'btn-primary'} p-1 m-1`}
                        onClick={
                            () => {
                                if (!imprimirExamenesSeleccionados) {
                                    this.setState({
                                        imprimirRecibo: false,
                                        imprimirExamenes: false,
                                        imprimirExamenesSeleccionados: true
                                    });
                                } else {
                                    print();
                                    this.setState({
                                        imprimirRecibo: false,
                                        imprimirExamenes: false,
                                        imprimirExamenesSeleccionados: false
                                    });
                                }
                            }
                        }>
                        <i className="fa fa-print" aria-hidden="true"> Exámenes
                            Seleccionados ({length})</i>
                    </button>
                    }
                </div>
            )
        }
    }

    renderImpresionRecibo() {
        const {entidad, medico_remitente, paciente, imprimirRecibo} = this.state;
        const {orden} = this.props;
        if (orden && orden.estado === 1 && imprimirRecibo) {
            return (
                <OrdenImpresionRecibo
                    paciente={paciente}
                    orden={orden}
                    entidad={entidad}
                    medico_remitente={medico_remitente}
                />
            )
        }
    }

    renderOrdenExamenesImpresion() {
        const {entidad, medico_remitente, paciente, imprimirExamenes} = this.state;
        const {orden, orden: {mis_examenes}} = this.props;
        if (orden && orden.estado === 1 && imprimirExamenes) {
            const mis_examenes_para_imprimir = mis_examenes.filter(examen => {
                return (examen.examen_estado === 2 || examen.examen_estado === 3)
            });
            return (
                <OrdenExamenesImpresionRecibo
                    paciente={paciente}
                    orden={orden}
                    entidad={entidad}
                    medico_remitente={medico_remitente}
                    examenes={mis_examenes_para_imprimir}
                />
            )
        }
    }

    renderOrdenExamenesSeleccionadosImpresion() {
        const {entidad, medico_remitente, paciente, imprimirExamenesSeleccionados, lista_imprimir} = this.state;
        const {orden, orden: {mis_examenes}} = this.props;
        if (orden && orden.estado === 1 && imprimirExamenesSeleccionados) {
            const mis_examenes_para_imprimir = mis_examenes.filter(examen => {
                return lista_imprimir.indexOf(examen.id) >= 0
            });
            return (
                <OrdenExamenesImpresionRecibo
                    paciente={paciente}
                    orden={orden}
                    entidad={entidad}
                    medico_remitente={medico_remitente}
                    examenes={mis_examenes_para_imprimir}
                />
            )
        }
    }

    render() {
        const {orden} = this.props;
        document.title = 'Orden Laboratorio';
        if (!orden) {
            return (<div>Cargando orden...</div>)
        }
        return (
            <div>
                <div className="row p-4" id="react-no-print">
                    <div className="col-12">
                        <h3>{`${document.title} ${orden.id}`}</h3>
                    </div>
                    <OrdenEditarForm
                        {...this.props}
                        {...this.state}
                        setState={this.setState.bind(this)}
                        onSubmit={this.onSubmit.bind(this)}
                    />
                    {this.renderExamenes()}
                    <div className="col-12">
                        {this.renderBotonPagado()}
                        {this.renderBotonDescartar()}
                    </div>
                    {this.renderBotonImprimir()}
                </div>
                {this.renderImpresionRecibo()}
                {this.renderOrdenExamenesImpresion()}
                {this.renderOrdenExamenesSeleccionadosImpresion()}
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        orden: state.ordenes[id],
        entidades: state.entidades,
        medicos_remitentes: state.medicos_remitentes,
        pacientes: state.pacientes
    }
}

export default (connect(mapPropsToState, actions)(EditarOrdenLaboratorio));
