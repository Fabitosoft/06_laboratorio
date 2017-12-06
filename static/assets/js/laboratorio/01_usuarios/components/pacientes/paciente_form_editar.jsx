import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';

import validate from './validate_form';
import asyncValidate from './asyncValidateEditar';

import PacienteForm from '../datos_cedula_form';
import {TextField} from "redux-form-material-ui";

const lower = value => value && value.toLowerCase();

class PacienteEditarForm extends Component {
    render() {
        const {
            pristine,
            submitting,
            onSubmit,
            handleSubmit,
            reset
        } = this.props;

        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <PacienteForm/>
                        <div className="row">
                            <div className="col-12">
                                <h4>Información de Contacto</h4>
                            </div>
                            <div className="col-12 col-md-6 col-xl-6">
                                <Field
                                    fullWidth={true}
                                    name="email"
                                    component={TextField}
                                    hintText="Correo Electrónico"
                                    floatingLabelText="Correo Electrónico"
                                    normalize={lower}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-12 col-md-6 col-xl-3">
                                <Field
                                    fullWidth={true}
                                    name="telefono"
                                    component={TextField}
                                    hintText="Teléfono"
                                    floatingLabelText="Teléfono"
                                    normalize={lower}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-12 col-md-6 col-xl-3">
                                <Field
                                    fullWidth={true}
                                    name="telefono_2"
                                    component={TextField}
                                    hintText="Teléfono Dos"
                                    floatingLabelText="Teléfono Dos"
                                    normalize={lower}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="button" className="btn btn-secondary"
                                        onClick={reset}
                                        disabled={pristine || submitting}>
                                    Deshacer Cambios
                                </button>
                                <Link to="/app/paciente/lista/">
                                    <button type="button" className="btn btn-secondary">
                                        Cancelar
                                    </button>
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                    Guardar
                                </button>
                            </div>
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

PacienteEditarForm = reduxForm({
    form: "pacienteEditarForm",
    validate,
    asyncValidate,
    asyncBlurFields: ['nro_identificacion', 'tipo_documento'],
    enableReinitialize: true
})(PacienteEditarForm);

PacienteEditarForm = (connect(mapPropsToState, null)(PacienteEditarForm));

export default PacienteEditarForm;
