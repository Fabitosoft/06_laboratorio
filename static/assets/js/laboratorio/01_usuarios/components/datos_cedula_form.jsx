import React, {Component} from 'react';
import {Field} from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import RadioButton from 'material-ui/RadioButton';
import moment from 'moment-timezone';
import MenuItem from 'material-ui/MenuItem';
import {
    TextField,
    SelectField,
    RadioButtonGroup
} from 'redux-form-material-ui'
import momentLocaliser from 'react-widgets-moment';


moment.tz.setDefault("America/Bogota");
momentLocaliser(moment);

const upper = value => value && value.toUpperCase();
const lower = value => value && value.toLowerCase();

export default class DatosCedulaForm extends Component {
    renderDateTimePicker({input: {onChange, value}, showTime}) {
        const now = moment();
        const fechaHoy = moment(now, "YYYY MM DD", "es");
        const fecha_nacimiento = moment(value, "YYYY MM DD", "es").tz('America/Bogota');
        const diferencia = fechaHoy.diff(fecha_nacimiento, "years");

        const show_edad = `${diferencia} años`;

        return (
            <div>
                <DateTimePicker
                    onChange={onChange}
                    format="YYYY-MM-DD"
                    time={false}
                    value={!value ? null : new Date(value)}
                />{value === '' ? '' : show_edad}
            </div>
        )
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h4>Información Personal</h4>
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Field
                        fullWidth={true}
                        name="nombre"
                        component={TextField}
                        hintText="Nombre"
                        floatingLabelText="Nombre"
                        normalize={upper}
                        autoComplete="off"
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Field
                        fullWidth={true}
                        name="nombre_segundo"
                        component={TextField}
                        hintText="Segundo Nombre"
                        floatingLabelText="Segundo Nombre"
                        normalize={upper}
                        autoComplete="off"
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Field
                        fullWidth={true}
                        name="apellido"
                        component={TextField}
                        hintText="Apellido"
                        floatingLabelText="Apellido"
                        normalize={upper}
                        autoComplete="off"
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Field
                        fullWidth={true}
                        name="apellido_segundo"
                        component={TextField}
                        hintText="Segundo Apellido"
                        floatingLabelText="Segundo Apellido"
                        normalize={upper}
                        autoComplete="off"
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
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
                    </Field>
                </div>
                <div className="col-12 col-md-6  col-xl-3">
                    <Field
                        fullWidth={true}
                        name="nro_identificacion"
                        autoComplete="off"
                        component={TextField}
                        hintText="Número Identificación"
                        floatingLabelText="Número Identificación"
                        normalize={upper}
                    />
                </div>
                <div className="col-12 col-md-6  col-xl-3">
                    <label>Fecha Nacimiento</label>
                    <Field
                        name="fecha_nacimiento"
                        type="date"
                        fullWidth={true}
                        label="Fecha de Nacimiento"
                        component={this.renderDateTimePicker}
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Field
                        fullWidth={true}
                        name="grupo_sanguineo"
                        component={SelectField}
                        hintText="Grupo Sanguineo"
                        floatingLabelText="Grupo Sanguineo"
                    >
                        <MenuItem value="APOSITIVO" primaryText="A Positivo"/>
                        <MenuItem value="OPOSITIVO" primaryText="O Positivo"/>
                        <MenuItem value="ONEGATIVO" primaryText="O Negativo"/>
                        <MenuItem value="ANEGATIVO" primaryText="A Negativo"/>
                        <MenuItem value="NI" primaryText="No Identificado"/>
                    </Field>
                </div>
                <div className="col-12 col-md-6">
                    <label>Genero</label>
                    <Field name="genero"
                           component={RadioButtonGroup}
                           fullWidth={true}
                    >
                        <RadioButton
                            value="F"
                            label="Femenino"
                        />
                        <RadioButton
                            value="M"
                            label="Masculino"
                        />
                    </Field>
                </div>
            </div>
        )
    }
}
