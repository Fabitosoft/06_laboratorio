import React, {Component} from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import {Field} from 'redux-form';
import RadioButton from 'material-ui/RadioButton';
import MenuItem from 'material-ui/MenuItem';
import {
    TextField,
    RadioButtonGroup,
    SelectField
} from 'redux-form-material-ui'


import moment from 'moment';
import momentLocaliser from 'react-widgets-moment';

moment.locale('es');
momentLocaliser(moment);


// function getEdad(value) {
//     return moment().diff(value, 'years')
// }

export default class InformacionPersonalForm extends Component {
    renderDateTimePicker({input: {onChange, value}, showTime}) {
        return (
            <DateTimePicker
                onChange={onChange}
                format="YYYY-MM-DD"
                time={false}
                value={!value ? null : new Date(value)}
            />
        )
    }

    render() {
        return (
            <div className="col-12">
                <h3>Información Personal</h3>
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-3">
                        <Field name="nombre"
                               fullWidth={true}
                               component={TextField}
                               floatingLabelText="Nombre"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <Field name="nombre_segundo"
                               component={TextField}
                               fullWidth={true}
                               label="Segundo Nombre"
                               floatingLabelText="Segundo Nombre"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <Field name="apellido"
                               component={TextField}
                               fullWidth={true}
                               floatingLabelText="Apellido"
                        />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3">
                        <Field name="apellido_segundo"
                               component={TextField}
                               fullWidth={true}
                               floatingLabelText="Segundo Apellido"
                        />
                    </div>
                    <div className="col-12">
                        <label>Fecha de Nacimiento</label>
                        <Field name="fecha_nacimiento" type="date"
                               fullWidth={true}
                               component={this.renderDateTimePicker}/>
                    </div>
                    <div className="col-12 col-sm-6">
                        <Field
                            fullWidth={true}
                            name="tipo_documento"
                            component={SelectField}
                            hintText="Tipo de documento"
                            floatingLabelText="Tipo de documento"
                        >
                            <MenuItem value="CC" primaryText="Cédula Ciudadania"/>
                            <MenuItem value="CE" primaryText="Cédula Extrangería"/>
                            <MenuItem value="PS" primaryText="Pasaporte"/>
                            <MenuItem value="TI" primaryText="Tarjeta de Identidad"/>
                        </Field>
                    </div>
                    <div className="col-12 col-sm-6">
                        <Field name="nro_identificacion"
                               component={TextField}
                               fullWidth={true}
                               floatingLabelText="Número Identificación"
                        />
                    </div>
                    <div className="col-12">
                        <Field name="genero"
                               component={RadioButtonGroup}
                               fullWidth={true}
                        >
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
}