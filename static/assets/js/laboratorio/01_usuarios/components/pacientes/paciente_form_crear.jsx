import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';

import validate from './validate_form';
import asyncValidate from './asyncValidateCrear';

import PacienteForm from '../datos_cedula_form';
import LectorCedulaForm from '../lector_cedula_form';
import {TextField} from "redux-form-material-ui";

const lower = value => value && value.toLowerCase();

class PacienteCrearForm extends Component {
    renderOpcionBarrasCedula() {
        const {
            cargarDatosDesdeLector,
            mostrarSoloParaCodigoBarras,
            mostrar_solo_codigo_barras
        } = this.props;
        return (
            <LectorCedulaForm
                cargarDatosDesdeLector={cargarDatosDesdeLector}
                mostrarSoloParaCodigoBarras={mostrarSoloParaCodigoBarras}
                mostrar_solo_codigo_barras={mostrar_solo_codigo_barras}
            />
        )
    }

    limpirFormulario() {
        const {
            reset,
            cargarDatosDesdeLector
        } = this.props;
        reset();
        cargarDatosDesdeLector({cedula: null})
    }

    renderFormulario() {
        const {
            pristine,
            submitting,
            onSubmit,
            handleSubmit
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
                                        onClick={this.limpirFormulario.bind(this)}
                                        disabled={submitting}>
                                    Limpiar
                                </button>
                                <Link to="/app/paciente/lista/">
                                    <button type="button" className="btn btn-secondary">
                                        Cancelar
                                    </button>
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                    Crear
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render() {
        const {
            mostrar_solo_codigo_barras,
            opcion_barras
        } = this.props;

        return (
            <div>
                {opcion_barras && this.renderOpcionBarrasCedula()}
                {!mostrar_solo_codigo_barras && this.renderFormulario()}
            </div>
        )

    }
}

function mapPropsToState(state, ownProps) {
    const {cedula} = ownProps;
    return {
        initialValues: cedula
    }
}

PacienteCrearForm = reduxForm({
    form: "pacienteCrearForm",
    validate,
    asyncValidate,
    asyncBlurFields: ['nro_identificacion', 'tipo_documento'],
    enableReinitialize: true
})(PacienteCrearForm);

PacienteCrearForm = (connect(mapPropsToState, null)(PacienteCrearForm));

export default PacienteCrearForm;
