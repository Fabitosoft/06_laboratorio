import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../1_actions/index';
import {Link} from 'react-router-dom';
import EntidadLaboratorio from '../components/entidad_orden_laboratorio'
import PacienteOrdenLaboratorio from '../components/paciente_orden_laboratorio/paciente_orden_laboratorio';
import MedicoRemitente from '../components/medico_remitente_orden_laboratorio';
import ExamenesOrdenBusqueda from '../components/examen_orden_laboratorio/examen_orden_laboratorio';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class NuevaOrdenLaboratorio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paciente: null,
            entidad: null,
            medicoRemitente: null,
            formaPago: null,
            contactoAlternativo: '',
            numeroContactoAlternativo: '',
            direccionContactoAlternativo: ''
        }
    }

    componentDidMount() {
        this.props.fetchEntidades();
    }

    calcularTotales() {
        const {examenesOrden} = this.state;
        let valor_total = 0;
        let valor_descuento = 0;
        let valor_final = 0;

        examenesOrden.map(examen => {
            console.log(examen);
            valor_total += parseInt(examen.valor, 10);
            valor_descuento += parseInt(examen.valor_descuento, 10);
            valor_final += parseInt(examen.valor_final, 10);
        });

        this.setState({valor_total, valor_descuento, valor_final});
    }

    crearOrdenLaboratorio() {
        const {paciente, entidad, formaPago, medicoRemitente} = this.state;

        const callback = (response) => {
            console.log(response);
            this.props.history.push(`/ordenes/${response.data.id}`);
        };

        let orden_laboratorio = {
            paciente: paciente.id,
            tipo_pago: formaPago,
            entidad: entidad.id,
            nombre_contacto_alternativo: this.state.contactoAlternativo,
            numero_contacto_alternativo: this.state.numeroContactoAlternativo,
            direccion_contacto_alternativo: this.state.direccionContactoAlternativo,
            valor_total: this.state.valor_total,
            valor_descuento: this.state.valor_descuento,
            valor_final: this.state.valor_final
        };

        if (medicoRemitente) {
            orden_laboratorio = {...orden_laboratorio, medico_remitente: medicoRemitente.id};
        }

        this.props.crearOrden(orden_laboratorio, callback)
    }

    cambiarFormaPago(event, index, value) {
        this.setState(
            {formaPago: value}
        )
    }

    cambiarPaciente(paciente) {
        this.setState({paciente})
    }

    cambiarEntidad(entidad) {
        this.setState({entidad})
    }

    cambiarMedicoRemitente(medicoRemitente) {
        this.setState({medicoRemitente})
    }

    // adicionarExamen(examen) {
    //     const {examenesOrden} = this.state;
    //     this.setState({examenesOrden: [...examenesOrden, examen]});
    //     this.calcularTotales();
    // }
    //
    // cambiarDescuento(index, porcentaje) {
    //     const {examenesOrden} = this.state;
    //     let examen = examenesOrden[index];
    //     examen.descuento = porcentaje;
    //     examen.valor_descuento = (examen.valor * (porcentaje / 100));
    //     examen.valor_final = examen.valor - examen.valor_descuento;
    //     this.setState({examenesOrden: [...examenesOrden.slice(0, index), examen, ...examenesOrden.slice(index + 1)]});
    //     this.calcularTotales();
    // }
    //
    // eliminarExamen(index) {
    //     const {examenesOrden} = this.state;
    //     this.setState({examenesOrden: [...examenesOrden.slice(0, index), ...examenesOrden.slice(index + 1)]});
    //     this.calcularTotales();
    // }

    renderBotonCrearOrden() {
        const {paciente, entidad, formaPago} = this.state;
        if (paciente && entidad && formaPago) {
            return (
                <div className="col-12">
                    <button type="button" onClick={this.crearOrdenLaboratorio.bind(this)}>
                        Crear Orden de Laboratorio
                    </button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="card card-cascade narrower mb-r">
                <div className="admin-panel info-admin-panel">
                    <div className="view primary-color p-5">
                        <h1>Nueva Orden de Laboratorio</h1>
                        <div className="p1">
                            <div className="row">
                                <div className="col-12">
                                    <SelectField value={this.state.formaPago}
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
                                    <EntidadLaboratorio
                                        entidades={this.props.entidades}
                                        entidad={this.state.entidad}
                                        cambiarEntidad={this.cambiarEntidad.bind(this)}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <MedicoRemitente
                                        medicosRemitentes={this.props.medicos_remitentes}
                                        medicoRemitente={this.state.medicoRemitente}
                                        cambiarMedicoRemitente={this.cambiarMedicoRemitente.bind(this)}
                                        {...this.props}
                                    />
                                </div>
                                <div className="col-12 col-6 p2">
                                    <h2>Paciente</h2>
                                    <PacienteOrdenLaboratorio
                                        paciente={this.state.paciente}
                                        cambiarPaciente={this.cambiarPaciente.bind(this)}
                                        {...this.props}
                                    />
                                </div>
                                <div className="col-12 p2">
                                    <h2>Contacto Alternativo</h2>
                                    <div className="row">
                                        <div className="col-12 col-md-6">
                                            <TextField
                                                floatingLabelText="Nombre"
                                                value={this.state.contactoAlternativo}
                                                fullWidth={true}
                                                onChange={(event, value) => {
                                                    this.setState({
                                                        contactoAlternativo: value
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <TextField
                                                floatingLabelText="Número"
                                                fullWidth={true}
                                                value={this.state.numeroContactoAlternativo}
                                                onChange={(event, value) => {
                                                    this.setState({
                                                        numeroContactoAlternativo: value
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <TextField
                                                floatingLabelText="Dirección"
                                                value={this.state.direccionContactoAlternativo}
                                                fullWidth={true}
                                                onChange={(event, value) => {
                                                    this.setState({
                                                        direccionContactoAlternativo: value
                                                    })
                                                }}
                                            />
                                        </div>

                                        {/*<div className="col-12">*/}
                                        {/*<ExamenesOrdenBusqueda*/}
                                        {/*adicionarExamen={this.adicionarExamen.bind(this)}*/}
                                        {/*eliminarExamen={this.eliminarExamen.bind(this)}*/}
                                        {/*cambiarDescuento={this.cambiarDescuento.bind(this)}*/}
                                        {/*{...this.state}*/}
                                        {/*/>*/}
                                        {/*</div>*/}

                                    </div>
                                    {this.renderBotonCrearOrden()}
                                </div>
                                <Link className="right" to="/ordenes/">
                                    <small>Cancelar</small>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        ordenes: state.ordenes,
        entidades: state.entidades,
        medicos_remitentes: state.medicos_remitentes,
        pacientes: state.pacientes,
    }
}

export default connect(mapPropsToState, actions)(NuevaOrdenLaboratorio)


