import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../1_actions/index';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import AutoComplete from 'material-ui/AutoComplete';
import PacienteOrdenLaboratorio from '../components/paciente_orden_laboratorio/paciente_orden_laboratorio';

class TercerosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paciente: null
        }
    }

    renderTerceros(tercero) {
        return (
            <Link key={tercero.id} to={`/usuarios/editar/${tercero.id}`}>
                <li>{tercero.username}</li>
            </Link>
        )
    }

    render() {
        return (
            <div className="card card-cascade narrower mb-r">
                <div className="admin-panel info-admin-panel">
                    <div className="view primary-color p-5">
                        <h5>Ordenes</h5>
                        <PacienteOrdenLaboratorio
                            paciente={this.state.paciente}
                            setState={this.setState.bind(this)}
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
    }
}

export default connect(mapPropsToState, actions)(TercerosList)