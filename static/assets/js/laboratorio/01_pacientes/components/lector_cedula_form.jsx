import React, {Component} from 'react';
import {Field} from 'redux-form';
import {
    TextField
} from 'redux-form-material-ui'

import moment from 'moment-timezone';
import momentLocaliser from 'react-widgets-moment';

moment.tz.setDefault("America/Bogota");
momentLocaliser(moment);

class LectorCedulaForm extends Component {
    validarLector(e) {
        const {cargarDatosDesdeLector} = this.props;
        const lectorSinEspacio = e.target.value.replace(/ /g, '').toUpperCase();
        const lectorSinPuntos = lectorSinEspacio.replace(/\./g, '');
        const arrayOfStrings = lectorSinPuntos.split(",");
        if (arrayOfStrings.length === 10) {
            const fechaNacimiento = moment(arrayOfStrings[6], "YYYYMMDD", "es").tz('America/Bogota');
            cargarDatosDesdeLector({
                cedula: {
                    nro_identificacion: arrayOfStrings[0],
                    nombre: arrayOfStrings[3],
                    nombre_segundo: arrayOfStrings[4],
                    apellido: arrayOfStrings[1],
                    apellido_segundo: arrayOfStrings[2],
                    genero: arrayOfStrings[5],
                    fecha_nacimiento: fechaNacimiento,
                    grupo_sanguineo: arrayOfStrings[7],
                    tipo_documento: "CC"
                }
            });
        }
    }

    render() {
        const {mostrarSoloParaCodigoBarras, mostrar_solo_codigo_barras} = this.props;
        if (mostrar_solo_codigo_barras) {
            return (
                <div className="row">
                    <div className="col-12">
                        <Field
                            fullWidth={true}
                            name="lector_barras"
                            component={TextField}
                            autoComplete="off"
                            hintText="Lector Cédula"
                            floatingLabelText="Escaner aquí"
                            onBlur={(e) => {
                                this.validarLector(e);
                                mostrarSoloParaCodigoBarras(false);
                            }}
                        />
                        <i className="fa fa-barcode fa-2x" onClick={() => {
                            mostrarSoloParaCodigoBarras(false);
                        }}></i>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-12">
                        <i className="fa fa-barcode fa-2x" onClick={() => {
                            mostrarSoloParaCodigoBarras(true);
                        }}></i>
                    </div>
                </div>
            )
        }
    }
}

export default LectorCedulaForm;
