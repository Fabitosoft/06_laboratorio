import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';

import PacienteCrearForm from '../../components/pacientes/paciente_form_crear';


class PacienteCrear extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            cedula: null,
            mostrar_solo_codigo_barras: false
        })
    }

    componentDidMount() {
        const {fetchMisPermisos} = this.props;
        fetchMisPermisos();
    }

    onSubmit(values) {
        const {crearPaciente, notificarAction, history} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        crearPaciente(values, (response) => {
                notificarAction(`Se ha creado con éxito el paciente ${response.full_name}`);
                history.push('/app/paciente/lista/');
            },
            error_callback
        );
    }

    tienePermiso(permiso_nombre) {
        const {mis_permisos} = this.props;
        return mis_permisos.includes(permiso_nombre)
    }

    render() {
        if (!this.tienePermiso("add_paciente")) {
            return <div className="col-12">No tiene permisos suficientes para crear pacientes</div>
        }
        return (
            <div className="row">
                <div className="col-12">
                    <h3 className="h3-responsive">Crear Paciente</h3>
                </div>
                <div className="col-12">
                    <PacienteCrearForm
                        onSubmit={this.onSubmit.bind(this)}
                        cedula={this.state.cedula}
                        mostrar_solo_codigo_barras={this.state.mostrar_solo_codigo_barras}
                        cargarDatosDesdeLector={cedula => {
                            this.setState(cedula)
                        }}
                        mostrarSoloParaCodigoBarras={mostrar_solo_codigo_barras => {
                            this.setState({mostrar_solo_codigo_barras})
                        }}
                        opcion_barras={true}
                    />
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        mis_permisos: state.mis_permisos
    }
}

export default connect(mapPropsToState, actions)(PacienteCrear);
