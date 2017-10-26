import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../1_actions/index';
import {Link} from 'react-router-dom';
import EntidadLaboratorio from '../components/entidad_orden_laboratorio'
import PacienteOrdenLaboratorio from '../components/paciente_orden_laboratorio/paciente_orden_laboratorio';
import MedicoRemitente from '../components/medico_remitente_orden_laboratorio';

class TercerosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paciente: null,
            entidad: null,
            medicoRemitente: null
        }
    }

    componentDidMount() {
        this.props.fetchEntidades();
    }

    cambiarPaciente(paciente) {
        this.setState({paciente})
    }

    cambiarEntidad(entidad) {
        this.setState({entidad});
        this.props.fetcExamenesxEntidad(entidad.id);
    }

    cambiarMedicoRemitente(medicoRemitente) {
        this.setState({medicoRemitente})
    }

    render() {
        return (
            <div className="card card-cascade narrower mb-r">
                <div className="admin-panel info-admin-panel">
                    <div className="view primary-color p-5">
                        <h1>Nueva Orden de Laboratorio</h1>
                        <EntidadLaboratorio
                            entidades={this.props.entidades}
                            entidad={this.state.entidad}
                            cambiarEntidad={this.cambiarEntidad.bind(this)}
                        />
                        <MedicoRemitente
                            medicosRemitentes={this.props.medicos_remitentes}
                            medicoRemitente={this.state.medicoRemitente}
                            cambiarMedicoRemitente={this.cambiarMedicoRemitente.bind(this)}
                            {...this.props}
                        />
                        <h2>Paciente</h2>
                        <PacienteOrdenLaboratorio
                            paciente={this.state.paciente}
                            cambiarPaciente={this.cambiarPaciente.bind(this)}
                            {...this.props}
                        />
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
        examenes: state.examenes
    }
}

export default connect(mapPropsToState, actions)(TercerosList)