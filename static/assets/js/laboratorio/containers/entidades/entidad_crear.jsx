import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/index';
import {Field, reduxForm} from 'redux-form';
import {
    TextField
} from 'redux-form-material-ui'

import validate from '../../components/entidades/crear/validate';

import {NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

class EntidadesCrear extends Component {
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

    onSubmit(values) {
        const {crearEntidad} = this.props;
        crearEntidad(
            values,
            response => {
                this.notificar(`Se há creado correctamente la entidad ${response.nombre}`);
                this.props.history.push(`/app/entidades/editar/${response.id}`);
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
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div>
                <h1>Crear Entidad</h1>
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
                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                        Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" disabled={pristine || submitting}
                            onClick={reset}>
                        Limpiar
                    </button>
                </form>
            </div>
        )
    }
}

EntidadesCrear = reduxForm({
    form: "entidadCrearForm",
    validate,
    enableReinitialize: true
})(EntidadesCrear);

export default (connect(null, actions)(EntidadesCrear));
