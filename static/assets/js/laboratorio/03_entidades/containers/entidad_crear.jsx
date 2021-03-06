import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {
    TextField
} from 'redux-form-material-ui'

import validate from '../components/crear/validate';


class EntidadesCrear extends Component {
    onSubmit(values) {
        const {crearEntidad, notificarAction} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        crearEntidad(
            values,
            response => {
                notificarAction(`Se há creado correctamente la entidad ${response.nombre}`);
                this.props.history.push(`/app/entidades/editar/${response.id}`);
            },
            error_callback
        );
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div>
                <h3>Crear Entidad</h3>
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
