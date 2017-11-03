import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../1_actions/index';
import {Link} from 'react-router-dom';

class OrdenLaboratorio extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="card card-cascade narrower mb-r">
                <div className="admin-panel info-admin-panel">
                    <div className="view primary-color p-5">
                        <h1>Orden De Laboratorio</h1>
                        <div className="p1">
                            <div className="row">
                                Hola
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
        ordenes: state.ordenes
    }
}

export default connect(mapPropsToState, actions)(OrdenLaboratorio)