import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../1_actions/index';
import {Link} from 'react-router-dom';

class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="card card-cascade narrower mb-r">
                <div className="admin-panel info-admin-panel">
                    <div className="view primary-color p-5">
                        <h1>Ordenes de Laboratorio</h1>
                        <Link className="right" to="/ordenes/nueva/">
                            <small> Nueva</small>
                        </Link>
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

export default connect(mapPropsToState, actions)(App)