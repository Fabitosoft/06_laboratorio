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

    onSubmit(values) {
        const {crearPaciente, notificarAction, history} = this.props;
        crearPaciente(values, (response) => {
            notificarAction(`Se ha creado con éxito el paciente ${response.full_name}`);
            history.push('/app/paciente/lista/');
        });
    }

    render() {
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

export default connect(null, actions)(PacienteCrear);
