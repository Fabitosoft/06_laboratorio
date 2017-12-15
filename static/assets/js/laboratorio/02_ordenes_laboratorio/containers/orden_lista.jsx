import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';

import TablaLista from '../components/lista_tabla'

class OrdenesLista extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            busqueda: ""
        })
    }

    renderTabla() {
        const {ordenes} = this.props;
        if (this.state.busqueda.length < 3) {
            return (<div>Nada que buscar</div>)
        } else {
            return (
                <TablaLista ordenes={ordenes}/>
            )
        }
    }

    buscarOrden(busqueda) {
        this.setState({busqueda});
        if (busqueda.length >= 3) {
            const error_callback = (error) => {
                this.props.notificarErrorAjaxAction(error);
            };
            this.props.fetchOrdenesxParametro(busqueda, null, error_callback);
        }
    }

    render() {
        const {busqueda} = this.state;
        return (
            <div>
                <h3>Ordenes de Laboratorio <Link to={`/app/ordenes_laboratorio/crear/`}>
                    <i
                        className="fa fa-plus"
                        aria-hidden="true"></i>
                </Link>
                </h3>
                <div className="col-12">
                    <TextField
                        floatingLabelText="A buscar"
                        fullWidth={true}
                        onChange={e => {
                            this.buscarOrden(e.target.value)
                        }}
                        autoComplete="off"
                        value={busqueda}
                    />
                    {this.renderTabla()}
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

OrdenesLista = (connect(mapPropsToState, actions)(OrdenesLista));

export default OrdenesLista;
