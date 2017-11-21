import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/index';
import TextField from 'material-ui/TextField';

import Tabla from '../../components/entidades/lista/entidades_lista_tabla';
import {NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

class EntidadesLista extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            busqueda: ""
        })
    }

    notificar(mensaje, tipo = 'success') {
        let tipo_notificacion = NOTIFICATION_TYPE_SUCCESS;
        switch (tipo) {
            case 'success':
                tipo_notificacion = NOTIFICATION_TYPE_SUCCESS;
                break;
            case 'error':
                tipo_notificacion = NOTIFICATION_TYPE_ERROR;
                break;
        }
        const {createNotification} = this.props;
        const mySuccessNotification = {
            message: mensaje,
            type: tipo_notificacion,
            duration: 3000,
            position: 'BottomRight',
            canDimiss: true,
            icon: <i className="fa fa-check"/>
        };
        createNotification(mySuccessNotification);
    }

    eliminarEntidad(entidad, callback) {
        const callback_error = (error) => {
            const errorMensaje = Object.getOwnPropertyDescriptor(error, 'message').value;
            console.log(errorMensaje);
        };
        this.props.deleteEntidad(entidad.id, callback, callback_error)
    }

    actualizarEntidad(entidad, callback) {
        this.props.updateEntidad(entidad.id, entidad, callback);
    }

    buscarPorParametro(busqueda) {
        this.setState({busqueda});
        const {fetchEntidadesxParametro} = this.props;
        fetchEntidadesxParametro(this.state.busqueda);
    }

    renderTabla() {
        if (this.state.busqueda.length === 0) {
            return (<div>Nada que buscar</div>)
        } else {
            return <Tabla
                entidades={this.props.entidades}
                eliminarEntidad={this.eliminarEntidad.bind(this)}
                actualizarEntidad={this.actualizarEntidad.bind(this)}
                notificar={this.notificar.bind(this)}
            />
        }
    }

    render() {
        const {busqueda} = this.state;
        return (
            <div>
                <h1>Entidades</h1>
                <TextField
                    floatingLabelText="A buscar"
                    fullWidth={true}
                    onChange={e => {
                        this.buscarPorParametro(e.target.value)
                    }}
                    autoComplete="off"
                    value={busqueda}
                />
                {this.renderTabla()}
            </div>

        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        entidades: state.entidades
    }
}

export default connect(mapPropsToState, actions)(EntidadesLista);
