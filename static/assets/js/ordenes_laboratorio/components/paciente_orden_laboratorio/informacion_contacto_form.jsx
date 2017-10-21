import React from 'react';
import {Field} from 'redux-form';
import {
    TextField
} from 'redux-form-material-ui'
export default (props) => {
    return (
        <div className="col-12">
            <h3>Información de Contacto</h3>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Field name="email" component={TextField}
                                   floatingLabelText="Correo Electrónico"
                                   hintText="Correo Electrónico"/>
                        </div>
                        <div className="col-12 col-md-6">
                            <Field name="telefono" component={TextField}
                                   floatingLabelText="Número Telefónico"
                                   hintText="Teléfono"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}