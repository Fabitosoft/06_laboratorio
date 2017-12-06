import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../../../1_actions/01_index'

import validate from './validate_form';
import asyncValidate from './asyncValidateCrear';

import CedulaForm from '../datos_cedula_form';
import DatosEspecialistaForm from './datos_especialistas_form';
import LectorCedulaForm from '../lector_cedula_form';

import BuscarEspecialidad from '../../../components/buscadores_autocomplete/buscar/buscar_especialidad';

class EspecialistaCrearForm extends Component {
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
            submitting,
            handleSubmit,
            fetchEspecialidadxParametro,
            especialidades,
            setState,
            onSubmit,
            searchText_especialidad
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
                                        onClick={this.limpirFormulario.bind(this)}
                                        disabled={submitting}>
                                    Limpiar
                                </button>
                                <Link to="/app/especialista/lista/">
                                    <button type="button" className="btn btn-secondary">
                                        Cancelar
                                    </button>
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
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
        initialValues: cedula,
        especialidades: state.especialidades
    }
}

EspecialistaCrearForm = reduxForm({
    form: "especialistaCrearForm",
    validate,
    //asyncValidate,
    //asyncBlurFields: ['nro_identificacion', 'tipo_documento'],
    enableReinitialize: true
})(EspecialistaCrearForm);

EspecialistaCrearForm = (connect(mapPropsToState, actions)(EspecialistaCrearForm));

export default EspecialistaCrearForm;
