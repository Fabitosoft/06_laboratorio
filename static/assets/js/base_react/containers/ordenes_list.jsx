import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../1_actions/index';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class TercerosList extends Component {
    componentDidMount() {
        this.props.fetchOrdenes();
        this.props.fetchEntidades();
        this.props.fetchMedicosRemitentes();
        this.props.fetchPacientes();
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
                    <div className="view primary-color">
                        <h5>Ordenes</h5>
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