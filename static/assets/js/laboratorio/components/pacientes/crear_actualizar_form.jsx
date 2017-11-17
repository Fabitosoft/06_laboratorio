import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/index';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';


import InformacionPersonalForm from '../pacientes/informacion_personal_form';
import InformacionContactoForm from '../pacientes/informacion_contacto_form';


class PacienteCrearActualizarForm extends Component {
    renderMensajePacienteEncontrado() {
        const {paciente} = this.props;
        if (paciente) {
            return (
                <div>
                    Se encontró
                    a {paciente.nombre} {paciente.nombre_segundo} {paciente.apellido} {paciente.apellido_segundo}
                </div>
            )
        }
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, onSubmit, reset_paciente, paciente, textoBuscado} = this.props;

        if (textoBuscado === "") {
            return (<div></div>)
        }

        let crear_o_actualizar_titulo = 'Actualizar Paciente';
        if (!paciente) {
            crear_o_actualizar_titulo = 'Crear Paciente'
        }
        return (
            <div>
                <div className='row'>
                    <div className='col-12'>
                        <h1>{crear_o_actualizar_titulo}</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InformacionPersonalForm/>
                        <InformacionContactoForm/>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                Guardar
                            </button>
                            <button type="button" className="btn btn-secondary" disabled={pristine || submitting} onClick={reset}>
                                Deshacer Cambios
                            </button>
                            <button type="button" className="btn btn-warning" onClick={reset_paciente}>
                                Limpiar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {paciente} = ownProps;
    return {
        initialValues: paciente
    }
}

PacienteCrearActualizarForm = reduxForm({
    form: "crearActualizarPacienteForm",
    enableReinitialize: true
})(PacienteCrearActualizarForm);

PacienteCrearActualizarForm = (connect(mapPropsToState, actions)(PacienteCrearActualizarForm));

export default PacienteCrearActualizarForm;
