import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/index';
import AutoComplete from 'material-ui/AutoComplete';

import TablaLista from '../../components/ordenes/lista_tabla'
import BuscarOrden from '../../components/ordenes/buscar_orden'

class OrdenesLista extends Component {
    buscarOrden(event) {
        const {fetchOrdenesxParametro} = this.props;
        fetchOrdenesxParametro(event.target.value);
    }

    render() {
        const {ordenes} = this.props;
        return (
            <div>
                <BuscarOrden buscarOrden={this.buscarOrden.bind(this)}/>
                <TablaLista ordenes={ordenes}/>
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
