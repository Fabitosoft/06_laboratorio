import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/index';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {
    TextField,
    Checkbox
} from 'redux-form-material-ui'

import validate from '../../components/entidades/editar/validate';
import TablaContactos from '../../components/entidades/editar/entidades_editar_contactos_tabla';
import TablaExamenes from '../../components/entidades/editar/entidades_editar_examenes_tabla';

import {NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

class EntidadesEditar extends Component {
    componentDidMount() {
        const {fetchEntidad, match: {params: {id}}} = this.props;
        fetchEntidad(id);
    }

    notificar(mensaje, tipo = 'success') {
        let tipo_notificacion = NOTIFICATION_TYPE_SUCCESS;
        switch (tipo) {
            case 'success':
                tipo_notificacion = NOTIFICATION_TYPE_SUCCESS;
                break;
            case 'error':
                tipo_notificacion = NOTIFICATION_TYPE_ERROR;
                break;
        }
        const {createNotification} = this.props;
        const mySuccessNotification = {
            message: mensaje,
            type: tipo_notificacion,
            duration: 3000,
            position: 'BottomRight',
            canDimiss: true,
            icon: <i className="fa fa-check"/>
        };
        createNotification(mySuccessNotification);
    }

    actualizarContactoEntidad(contacto, callback) {
        this.props.updateContactoEntidad(contacto.id, contacto, callback)
    }

    actualizarExamenEntidad(examen, callback) {
        this.props.updateExamenEntidad(examen.id, examen, callback)
    }

    eliminarContactoEntidad(contacto, callback) {
        this.props.deleteContactoEntidad(contacto.id, contacto, callback)
    }

    onSubmit(values) {
        const {updateEntidad, match: {params: {id}}, fetchEntidad} = this.props;
        updateEntidad(
            id,
            values,
            response => {
                this.notificar(`Se há actualizado correctamente la entidad ${response.nombre}`);
                fetchEntidad(id);
            },
            error => {
                // const error_mensaje = Object.assign({}, error);
                // if (error_mensaje.response && error_mensaje.response.data) {
                //     const mensajes = error_mensaje.response.data;
                //     console.log(mensajes);
                //     mensajes.map(mensaje => {
                //         this.notificar(mensaje, 'error')
                //     })
                // }
                // console.log('error', error);
                // console.log('errorType', typeof error);
                // console.log('error', Object.assign({}, error));
                // console.log('getOwnPropertyNames', Object.getOwnPropertyNames(error));
                // console.log('stackProperty', Object.getOwnPropertyDescriptor(error, 'stack'));
                // console.log('messageProperty', Object.getOwnPropertyDescriptor(error, 'message'));
                // console.log('stackEnumerable', error.propertyIsEnumerable('stack'));
                // console.log('messageEnumerable', error.propertyIsEnumerable('message'));
            }
        );
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, entidad} = this.props;
        if (!entidad) {
            return <div>Cargando...</div>
        }
        return (
            <div>
                <h1>Editar Entidad:</h1>
                <h5>{entidad.nombre}</h5>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="nit"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Nit"
                           autoComplete="off"
                    />
                    <Field name="nombre"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Nombre"
                           autoComplete="off"
                    />
                    <Field name="direccion"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Dirección"
                           autoComplete="off"
                    />
                    <Field name="telefono"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Teléfono"
                           autoComplete="off"
                    />
                    <Field name="activo"
                           component={Checkbox}
                           label="Activo"
                    />
                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                        Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" disabled={pristine || submitting}
                            onClick={reset}>
                        Limpiar
                    </button>
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
                        traerEntidad={this.props.fetchEntidad}
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
                        traerEntidad={this.props.fetchEntidad}
                        actualizarExamenEntidad={this.actualizarExamenEntidad.bind(this)}
                    />
                </div>
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
