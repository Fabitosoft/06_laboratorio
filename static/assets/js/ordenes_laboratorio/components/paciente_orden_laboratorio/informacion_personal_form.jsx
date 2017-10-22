import React from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {Field} from 'redux-form';
import RadioButton from 'material-ui/RadioButton';
import {
    TextField,
    RadioButtonGroup
} from 'redux-form-material-ui'

function renderDateTimePicker({input: {onChange, value}, showTime}) {
    return (
        <DateTimePicker
            onChange={onChange}
            format="YYYY-MM-DD"
            time={false}
            value={!value ? null : new Date(value)}
        />
    )
}

export default (props) => {
    return (
        <div className="col-12">
            <h3>Información Personal</h3>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                    <Field name="nombre"
                           component={TextField}
                           floatingLabelText="Nombre"
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <Field name="nombre_segundo"
                           component={TextField}
                           label="Segundo Nombre"
                           floatingLabelText="Segundo Nombre"
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <Field name="apellido"
                           component={TextField}
                           floatingLabelText="Apellido"
                    />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <Field name="apellido_segundo"
                           component={TextField}
                           floatingLabelText="Segundo Apellido"
                    />
                </div>
                <div className="col-12">
                    <label>Fecha de Nacimiento</label>
                    <Field name="fecha_nacimiento" type="date"
                           component={renderDateTimePicker}/>
                </div>
                <div className="col-12 col-sm-6">
                    <Field name="tipo_documento"
                           component={TextField}
                           floatingLabelText="Tipo Documento"
                    />
                </div>
                <div className="col-12 col-sm-6">
                    <Field name="nro_identificacion"
                           component={TextField}
                           floatingLabelText="Número Identificación"
                    />
                </div>
                <div className="col-12">
                    <Field name="genero" component={RadioButtonGroup}>
                        <RadioButton
                            value="femenino"
                            label="Femenino"
                        />
                        <RadioButton
                            value="masculino"
                            label="Masculino"
                        />
                    </Field>
                </div>
            </div>
        </div>
    )
}