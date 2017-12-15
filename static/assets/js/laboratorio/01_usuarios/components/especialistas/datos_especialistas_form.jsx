import React, {Component} from 'react';
import {Field} from 'redux-form';
import moment from 'moment-timezone';
import {
    TextField
} from 'redux-form-material-ui'
import momentLocaliser from 'react-widgets-moment';


moment.tz.setDefault("America/Bogota");
momentLocaliser(moment);

const upper = value => value && value.toUpperCase();

export default class DatosEspecialistaForm extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h4>Información Profesional</h4>
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Field
                        fullWidth={true}
                        name="universidad"
                        component={TextField}
                        hintText="Universidad"
                        floatingLabelText="Universidad"
                        normalize={upper}
                        autoComplete="off"
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Field
                        fullWidth={true}
                        name="registro_profesional"
                        component={TextField}
                        hintText="Nro. Registro Profesional"
                        floatingLabelText="Nro. Registro Profesional"
                        normalize={upper}
                        autoComplete="off"
                    />
                </div>
                <div className="col-12 col-md-6">
                    <Field name="email" component={TextField} floatingLabelText="Correo Electrónico"
                           hintText="Correo Electrónico"/>
                </div>
            </div>
        )
    }
}
