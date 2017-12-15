import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';

import Tabla from '../components/lista/entidades_lista_tabla';

class EntidadesLista extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            busqueda: ""
        })
    }

    eliminarEntidad(entidad, callback) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.props.deleteEntidad(entidad.id, callback, error_callback)
    }

    actualizarEntidad(entidad, callback) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.props.updateEntidad(entidad.id, entidad, callback, error_callback);
    }

    buscarPorParametro(busqueda) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.setState({busqueda});
        if (busqueda.length >= 3) {
            this.props.fetchEntidadesxParametro(busqueda,null, error_callback);
        }
    }

    renderTabla() {
        const {notificarAction} = this.props;
        if (this.state.busqueda.length === 0) {
            return (<div>Nada que buscar</div>)
        } else {
            return <Tabla
                entidades={this.props.entidades}
                eliminarEntidad={this.eliminarEntidad.bind(this)}
                actualizarEntidad={this.actualizarEntidad.bind(this)}
                notificarAction={notificarAction}
            />
        }
    }

    render() {
        const {busqueda} = this.state;
        return (
            <div>
                <h3>Entidades <Link to={`/app/entidades/crear/`}>
                    <i
                        className="fa fa-plus"
                        aria-hidden="true"></i>
                </Link>
                </h3>
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
