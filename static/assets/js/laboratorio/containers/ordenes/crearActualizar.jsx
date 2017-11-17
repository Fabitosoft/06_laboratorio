import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/index';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import BuscarEntidad from '../../components/ordenes/buscar_entidad'
import BuscarMedicoRemitente from '../../components/ordenes/buscar_medico_remitente'
import BuscarPaciente from '../../components/ordenes/buscar_paciente'

class CrearOrdenLaboratorio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paciente: null,
            orden_laboratorio: null,
            entidad: null,
            medico_remitente: null,
            tipo_pago: null,
            nombre_contacto_alternativo: '',
            numero_contacto_alternativo: '',
            direccion_contacto_alternativo: '',
            searchTextPaciente: '',
            searchTextEntidad: '',
            searchTextMedicoRemitente: ''
        }
    }

    crearOrdenLaboratorio() {
        const {
            paciente,
            entidad,
            tipo_pago,
            medico_remitente,
            nombre_contacto_alternativo,
            numero_contacto_alternativo,
            direccion_contacto_alternativo,
            valor_total,
            valor_descuento,
            valor_final
        } = this.state;
        const {crearOrden} = this.props;

        const callback = (response) => {
            this.setState({orden_laboratorio: response});
            this.props.history.push(`/app/ordenes_laboratorio/detail/${response.id}`);
        };

        let orden_laboratorio = {
            paciente: paciente.id,
            tipo_pago,
            entidad: entidad.id,
            nombre_contacto_alternativo,
            numero_contacto_alternativo,
            direccion_contacto_alternativo,
            valor_total,
            valor_descuento,
            valor_final
        };

        if (medico_remitente) {
            orden_laboratorio = {...orden_laboratorio, medico_remitente: medico_remitente.id};
        }
        crearOrden(orden_laboratorio, callback)
    }

    updateOrdenLaboratorio() {
        const {
            paciente,
            entidad,
            tipo_pago,
            medico_remitente,
            nombre_contacto_alternativo,
            numero_contacto_alternativo,
            direccion_contacto_alternativo,
            valor_total,
            valor_descuento,
            valor_final
        } = this.state;
        const {updateOrden} = this.props;

        let orden_laboratorio = {
            ...this.state.orden_laboratorio,
            paciente: paciente.id,
            tipo_pago,
            entidad: entidad.id,
            nombre_contacto_alternativo,
            numero_contacto_alternativo,
            direccion_contacto_alternativo,
            valor_total,
            valor_descuento,
            valor_final
        };

        if (medico_remitente) {
            orden_laboratorio = {...orden_laboratorio, medico_remitente: medico_remitente.id};
        }
        updateOrden(orden_laboratorio)
    }

    renderBotonCrearOrden() {
        const {paciente, entidad, tipo_pago, orden_laboratorio} = this.state;
        if (paciente && entidad && tipo_pago && !orden_laboratorio) {
            return (
                <div className="col-12">
                    <button type="button" className='btn btn-primary' onClick={this.crearOrdenLaboratorio.bind(this)}>
                        Crear Orden de Laboratorio
                    </button>
                </div>
            )
        }
    }

    renderBotonActualizarOrden() {
        const {paciente, entidad, tipo_pago, orden_laboratorio} = this.state;
        if (paciente && entidad && tipo_pago && orden_laboratorio) {
            return (
                <div className="col-12">
                    <button type="button" className='btn btn-primary' onClick={this.updateOrdenLaboratorio.bind(this)}>
                        Actualizar Orden de Laboratorio
                    </button>
                </div>
            )
        }
    }

    componentDidMount() {
        const {
            fetchEntidades,
            match: {params: {id}}
        } = this.props;
        fetchEntidades();
        if (id) {
            const {fetchOrden} = this.props;
            fetchOrden(id, orden_laboratorio => {
                const {
                    fetchEntidad,
                    fetchPaciente,
                    fetchMedicosRemitente
                } = this.props;
                const {
                    nombre_contacto_alternativo,
                    numero_contacto_alternativo,
                    direccion_contacto_alternativo,
                    tipo_pago
                } = orden_laboratorio;

                this.setState({
                    orden_laboratorio,
                    nombre_contacto_alternativo,
                    numero_contacto_alternativo,
                    direccion_contacto_alternativo,
                    tipo_pago
                });
                fetchEntidad(orden_laboratorio.entidad, entidad => {
                    this.setState({entidad, searchTextEntidad: entidad.nombre});
                });
                fetchPaciente(orden_laboratorio.paciente, paciente => {
                    this.setState({paciente, searchTextPaciente: paciente.nro_identificacion});
                });
                if (orden_laboratorio.medico_remitente) {
                    fetchMedicosRemitente(orden_laboratorio.medico_remitente, medico_remitente => {
                        this.setState({medico_remitente, searchTextMedicoRemitente: medico_remitente.getFullName});
                    })
                }
            })
        }
    }

    cambiarEntidad(entidad) {
        this.setState({entidad})
    }

    cambiarPaciente(paciente) {
        this.setState({paciente})
    }

    cambiarMedicoRemitente(medico_remitente) {
        this.setState({medico_remitente})
    }

    cambiarFormaPago(event, index, tipo_pago) {
        this.setState(
            {tipo_pago}
        )
    }

    setSearchTextPaciente(searchTextPaciente) {
        this.setState({searchTextPaciente})
    }

    setSearchTextEntidad(searchTextEntidad) {
        this.setState({searchTextEntidad})
    }

    setSearchTextMedicoRemitente(searchTextMedicoRemitente) {
        this.setState({searchTextMedicoRemitente})
    }

    render() {
        const {entidades, pacientes} = this.props;
        const {paciente} = this.state;

        let titulo = 'Crear Orden Laboratorio';
        const {match: {params: {id}}} = this.props;
        if (id) {
            titulo = `Orden de Laboratorio Nro. ${id}`;
        }
        return (
            <div className="row p-4">
                <div className="col-12">
                    <h1>{titulo}</h1>
                </div>
                <div className="col-12 col-md-6">
                    <SelectField value={this.state.tipo_pago}
                                 onChange={this.cambiarFormaPago.bind(this)}
                                 floatingLabelText="Forma de Pago"
                                 fullWidth={true}
                    >
                        <MenuItem value="efectivo" primaryText="Efectivo"/>
                        <MenuItem value="tarjeta" primaryText="Tarjeta"/>
                        <MenuItem value="relacion_cobro" primaryText="Relación de Cobro"/>
                        <MenuItem value="cortesia" primaryText="Cortesía"/>
                    </SelectField>
                </div>
                <div className="col-12 col-md-6">
                    <BuscarEntidad
                        searchTextEntidad={this.state.searchTextEntidad}
                        setSearchTextEntidad={this.setSearchTextEntidad.bind(this)}
                        entidades={entidades}
                        cambiarEntidad={this.cambiarEntidad.bind(this)}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <BuscarMedicoRemitente
                        orden={this.props.orden}
                        setSearchTextMedicoRemitente={this.setSearchTextMedicoRemitente.bind(this)}
                        searchTextMedicoRemitente={this.state.searchTextMedicoRemitente}
                        medicosRemitentes={this.props.medicos_remitentes}
                        medicoRemitente={this.state.medicoRemitente}
                        cambiarMedicoRemitente={this.cambiarMedicoRemitente.bind(this)}
                        {...this.props}
                    />
                </div>
                <div className="col-12">
                    <BuscarPaciente
                        pacientes={pacientes}
                        paciente={paciente}
                        searchTextPaciente={this.state.searchTextPaciente}
                        cambiarPaciente={this.cambiarPaciente.bind(this)}
                        setSearchTextPaciente={this.setSearchTextPaciente.bind(this)}
                        {...this.props}
                    />
                </div>
                <div className="col-12 p2">
                    <h2>Contacto Alternativo</h2>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField
                                floatingLabelText="Nombre"
                                value={this.state.nombre_contacto_alternativo}
                                fullWidth={true}
                                onChange={(event, value) => {
                                    this.setState({
                                        nombre_contacto_alternativo: value
                                    })
                                }}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField
                                floatingLabelText="Número"
                                fullWidth={true}
                                value={this.state.numero_contacto_alternativo}
                                onChange={(event, value) => {
                                    this.setState({
                                        numero_contacto_alternativo: value
                                    })
                                }}
                            />
                        </div>
                        <div className="col-12">
                            <TextField
                                floatingLabelText="Dirección"
                                value={this.state.direccion_contacto_alternativo}
                                fullWidth={true}
                                onChange={(event, value) => {
                                    this.setState({
                                        direccion_contacto_alternativo: value
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
                {this.renderBotonCrearOrden()}
                {this.renderBotonActualizarOrden()}
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        orden: id ? state.ordenes[id] : null,
        entidades: state.entidades,
        medicos_remitentes: state.medicos_remitentes,
        pacientes: state.pacientes
    }
}

CrearOrdenLaboratorio = (connect(mapPropsToState, actions)(CrearOrdenLaboratorio));

export default CrearOrdenLaboratorio;
