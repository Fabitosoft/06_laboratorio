import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {
    TextField,
    Checkbox
} from 'redux-form-material-ui'

import validate from '../components/editar/validate';
import TablaContactos from '../components/editar/entidades_editar_contactos_tabla';
import TablaExamenes from '../components/editar/entidades_editar_examenes_tabla';

class EntidadesEditar extends Component {
    componentDidMount() {
        const {fetchEntidad, match: {params: {id}}} = this.props;
        fetchEntidad(id);
    }

    actualizarContactoEntidad(contacto, callback) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.props.updateContactoEntidad(contacto.id, contacto, callback, error_callback)
    }

    actualizarExamenEntidad(examen, callback) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.props.updateExamenEntidad(examen.id, examen, callback, error_callback)
    }

    eliminarContactoEntidad(contacto, callback) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.props.deleteContactoEntidad(contacto.id, contacto, callback, error_callback)
    }

    traerEntidad(id, callback) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        this.props.fetchEntidad(id, callback, error_callback)
    }

    onSubmit(values) {
        const {updateEntidad, match: {params: {id}}, fetchEntidad, notificarAction} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        updateEntidad(
            id,
            values,
            response => {
                notificarAction(`Se há actualizado correctamente la entidad ${response.nombre}`);
                fetchEntidad(id);
            },
            error_callback
        );
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, entidad, notificarAction} = this.props;
        if (!entidad) {
            return <div>Cargando...</div>
        }
        return (
            <div>
                <h3>Editar Entidad:</h3>
                <h5>{entidad.nombre}</h5>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="row">
                        <div className="col-12 col-md-4 col-xl-4">
                            <Field name="nit"
                                   fullWidth={true}
                                   component={TextField}
                                   floatingLabelText="Nit"
                                   autoComplete="off"
                            />
                        </div>
                        <div className="col-12 col-md-8 col-xl-4">
                            <Field name="nombre"
                                   fullWidth={true}
                                   component={TextField}
                                   floatingLabelText="Nombre"
                                   autoComplete="off"
                            />
                        </div>
                        <div className="col-12 col-md-8 col-xl-4">
                            <Field name="direccion"
                                   fullWidth={true}
                                   component={TextField}
                                   floatingLabelText="Dirección"
                                   autoComplete="off"
                            />
                        </div>
                        <div className="col-12 col-md-4 col-xl-4">
                            <Field name="telefono"
                                   fullWidth={true}
                                   component={TextField}
                                   floatingLabelText="Teléfono"
                                   autoComplete="off"
                            />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4">
                            <Field name="activo"
                                   component={Checkbox}
                                   label="Activo"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                        Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" disabled={pristine || submitting}
                            onClick={reset}>
                        Limpiar
                    </button>
                    <Link to="/app/entidades/lista/">
                        <button type="button" className="btn btn-secondary">
                            Cancelar
                        </button>
                    </Link>
                </form>
                <div className="p-4">
                    <h3>Mís Contactos <Link to={`/app/entidades/contacto/crear/${entidad.id}`}>
                        <i
                            className="fa fa-plus"
                            aria-hidden="true"></i>
                    </Link>
                    </h3>
                    <TablaContactos
                        contactos={entidad.mis_contactos}
                        actualizarContactoEntidad={this.actualizarContactoEntidad.bind(this)}
                        eliminarContactoEntidad={this.eliminarContactoEntidad.bind(this)}
                        traerEntidad={this.traerEntidad.bind(this)}
                        notificarAction={notificarAction}
                    />
                </div>
                <div className="p-4">
                    <h3>Mís Exámenes <Link to={`/app/entidades/examen/crear/${entidad.id}`}>
                        <i
                            className="fa fa-plus"
                            aria-hidden="true"></i>
                    </Link>
                    </h3>
                    <TablaExamenes
                        examenes={entidad.mis_examenes}
                        traerEntidad={this.traerEntidad.bind(this)}
                        actualizarExamenEntidad={this.actualizarExamenEntidad.bind(this)}
                        notificarAction={notificarAction}
                    />
                </div>
                <Link to="/app/entidades/lista/">
                    <button type="button" className="btn btn-secondary">
                        Ver Listado Entidades
                    </button>
                </Link>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        entidad: state.entidades[id],
        initialValues: state.entidades[id]
    }
}

EntidadesEditar = reduxForm({
    form: "entidadEditarForm",
    validate,
    enableReinitialize: true
})(EntidadesEditar);

export default (connect(mapPropsToState, actions)(EntidadesEditar));
