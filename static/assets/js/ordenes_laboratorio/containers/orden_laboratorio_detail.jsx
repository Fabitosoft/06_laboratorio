import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../1_actions/01_index';
import {Link} from 'react-router-dom';

class OrdenLaboratorio extends Component {
    componentDidMount() {
        const {match: {params: {id}}} = this.props;
        this.props.fetchOrden(id);
    }

    render() {
        const {orden} = this.props;
        if (!orden) {
            return(<div>Cargando...</div>)
        }
        else {
            return (
                <div className="card card-cascade narrower mb-r">
                    <div className="admin-panel info-admin-panel">
                        <div className="view primary-color p-5">
                            <h1>Orden De Laboratorio</h1>
                            <div className="p1">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <h4>Orden Nr. {orden.id}</h4>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <h4>Paciente {orden.id}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        orden: state.ordenes[id],
        pacientes: state.pacientes
    }
}

export default connect(mapPropsToState, actions)(OrdenLaboratorio)