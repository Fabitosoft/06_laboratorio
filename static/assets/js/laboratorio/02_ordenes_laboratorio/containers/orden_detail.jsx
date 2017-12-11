import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';

import OrdenEditarForm from '../components/orden_form_editar';
import ExamenesOrden from '../components/orden_examenes';

import OrdenImpresionRecibo from '../components/orden_recibo_impresion';

class EditarOrdenLaboratorio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paciente: null,
            medico_remitente: null,
            entidad: null,
            searchText_entidad: "",
            searchText_paciente: "",
            searchText_medico_remitente: ""
        }
    }

    componentDidMount() {
        const {match: {params: {id}}} = this.props;
        const {fetchOrden, fetchEntidad, fetchMedicosRemitente, fetchPaciente} = this.props;

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
        updateOrden(orden_editada, callback)
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
        deleteOrdenExamen(examen.id, response => {
            fetchOrden(orden, orden_laboratorio => {
                this.calcularTotales(orden_laboratorio);
            });
        });
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
                    />
                )
            }
        }
    }

    renderBotonPagado() {
        const {orden, updateOrden, fetchOrden} = this.props;
        if (orden && orden.estado === 0) {
            return (
                <div className="col-12">
                    <button
                        type="button"
                        className='btn btn-primary'
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
                </div>
            )
        }
    }

    renderBotonImprimir() {
        const {orden} = this.props;
        if (orden && orden.estado === 1) {
            return (
                <div className="col-12">
                    <button
                        type="button"
                        className='btn btn-primary'
                        onClick={
                            () => {
                                print()
                            }
                        }>
                        <i className="fa fa-print" aria-hidden="true"></i>
                    </button>
                </div>
            )
        }
    }

    renderImpresion() {
        const {entidad, medico_remitente, paciente} = this.state;
        const {orden} = this.props;
        if (orden && orden.estado === 1) {
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
                    {this.renderBotonPagado()}
                    {this.renderBotonImprimir()}
                </div>
                {this.renderImpresion()}
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
