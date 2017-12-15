import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';

import Tabla from '../../components/pacientes/lista/paciente_lista_tabla';

class PacienteLista extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            busqueda: ""
        })
    }

    buscarPorParametro(busqueda) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.setState({busqueda});
        if (busqueda.length >= 3) {
            this.props.fetchPacientesxParametro(busqueda, null, error_callback);
        }
    }

    renderTabla() {
        const {notificarAction, pacientes} = this.props;
        if (this.state.busqueda.length < 3) {
            return (<div>Nada que buscar</div>)
        } else {
            return <Tabla
                pacientes={pacientes}
                notificarAction={notificarAction}
            />
        }
    }

    render() {
        const {busqueda} = this.state;
        return (
            <div className="row">

                <div className="col-12">
                    <h3 className="h3-responsive">Pacientes <Link to={`/app/paciente/crear/`}>
                        <i
                            className="fa fa-plus"
                            aria-hidden="true"></i>
                    </Link>
                    </h3>
                </div>
                <div className="col-12">
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
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        pacientes: state.pacientes
    }
}

export default connect(mapPropsToState, actions)(PacienteLista);
