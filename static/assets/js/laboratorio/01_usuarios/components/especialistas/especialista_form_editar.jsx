import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../../../1_actions/01_index'

import validate from './validate_form';
import asyncValidate from './asyncValidateEditar';

import CedulaForm from '../datos_cedula_form';
import DatosEspecialistaForm from './datos_especialistas_form';
import BuscarEspecialidad from '../../../components/buscadores_autocomplete/buscar/buscar_especialidad';

class EspecialistaEditarForm extends Component {

    render() {
        const {
            pristine,
            submitting,
            onSubmit,
            handleSubmit,
            fetchEspecialidadxParametro,
            especialidades,
            reset,
            searchText_especialidad,
            setState
        } = this.props;
        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CedulaForm/>
                        <DatosEspecialistaForm/>
                        <div className="row">
                            <div className="col-12 col-md-6 col-xl-3">
                                <Field
                                    busquedaAction={fetchEspecialidadxParametro}
                                    especialidades={especialidades}
                                    setStateInstance={especialidad => {
                                        setState({especialidad})

                                    }}
                                    searchText={searchText_especialidad}
                                    setSearchText={searchText_especialidad => {
                                        setState({searchText_especialidad})
                                    }}
                                    name="especialidad"
                                    component={BuscarEspecialidad}
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
                                <Link to="/app/especialista/lista/">
                                    <button type="button" className="btn btn-secondary">
                                        Cancelar
                                    </button>
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
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
    const {especialista} = ownProps;
    return {
        initialValues: especialista,
        especialidades: state.especialidades
    }
}

EspecialistaEditarForm = reduxForm({
    form: "pacienteEditarForm",
    validate,
    asyncValidate,
    asyncBlurFields: ['nro_identificacion', 'tipo_documento'],
    enableReinitialize: true
})(EspecialistaEditarForm);

EspecialistaEditarForm = (connect(mapPropsToState, actions)(EspecialistaEditarForm));

export default EspecialistaEditarForm;
