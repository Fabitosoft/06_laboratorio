import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {
    TextField
} from 'redux-form-material-ui'

import validate from './validate';

class ContactoEntidadCrear extends Component {
    componentDidMount() {
        const {fetchEntidad, match: {params: {id_entidad}}} = this.props;
        fetchEntidad(id_entidad);
    }

    onSubmit(values) {
        const {crearContactoEntidad, match: {params: {id_entidad}}, notificarAction} = this.props;
        const contacto = {...values, entidad: id_entidad};
        crearContactoEntidad(contacto, (response) => {
            notificarAction(`Se ha creado ${response.nombre} como contacto`)
            this.props.history.push(`/app/entidades/editar/${id_entidad}`);
        });
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, match: {params: {id_entidad}}} = this.props;
        const cancelar_link_to = `/app/entidades/editar/${id_entidad}`;
        return (
            <div>
                <h1>Crear Contacto Entidad</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="nombre"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Nombre"
                           autoComplete="off"
                    />
                    <Field name="correo_electronico"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Correo Electrónico"
                           autoComplete="off"
                    />
                    <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                        Guardar
                    </button>
                    <button type="button" className="btn btn-secondary" disabled={pristine || submitting}
                            onClick={reset}>
                        Limpiar
                    </button>
                    <Link to={cancelar_link_to}>
                        <button type="button" className="btn btn-secondary">
                            Cancelar
                        </button>
                    </Link>
                </form>
            </div>
        )
    }
}

ContactoEntidadCrear = reduxForm({
    form: "contactEntidadCrearForm",
    validate,
    enableReinitialize: true
})(ContactoEntidadCrear);

export default (connect(null, actions)(ContactoEntidadCrear));
