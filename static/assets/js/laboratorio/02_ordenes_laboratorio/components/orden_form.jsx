import React, {Component} from 'react';
import {Field} from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import {
    TextField,
    SelectField
} from 'redux-form-material-ui'

import BuscarEntidad from '../../components/buscadores_autocomplete/buscar/buscar_entidad';
import BuscarMedicoRemitente from '../../components/buscadores_autocomplete/buscar/buscar_medico_remitente';
import BuscarPaciente from '../../components/buscadores_autocomplete/buscar/buscar_paciente';


const upper = value => value && value.toUpperCase();
const lower = value => value && value.toLowerCase();

class OrdenForm extends Component {

    fetchEntidadesxParametro(busqueda) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const {fetchEntidadesxParametro} = this.props;
        fetchEntidadesxParametro(busqueda, null, error_callback);
    }

    fetchMedicoRemitentexParametro(busqueda) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const {fetchMedicoRemitentexParametro} = this.props;
        fetchMedicoRemitentexParametro(busqueda, null, error_callback);
    }


    fetchPacientesxParametro(busqueda) {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const {fetchPacientesxParametro} = this.props;
        fetchPacientesxParametro(busqueda, null, error_callback);
    }


    render() {
        const {
            entidades,
            medicos_remitentes,
            pacientes,
            fetchPacientesxParametro,
            fetchMedicoRemitentexParametro,
            fetchEntidadesxParametro,
            paciente,
            searchText_entidad,
            searchText_medico_remitente,
            searchText_paciente,
            setState
        } = this.props;
        return (
            <div className="row">
                <div className="col-12 col-md-6">
                    <Field
                        fullWidth={true}
                        name="tipo_pago"
                        component={SelectField}
                        hintText="Forma de Pago"
                        floatingLabelText="Forma de Pago"
                    >
                        <MenuItem value="EFECTIVO" primaryText="Efectivo"/>
                        <MenuItem value="TARJETA" primaryText="Tarjeta"/>
                        <MenuItem value="RELACION DE COBRO" primaryText="Relación de Cobro"/>
                        <MenuItem value="CORTESIA" primaryText="Cortesía"/>
                    </Field>
                </div>
                <div className="col-12 col-md-6">
                    <BuscarEntidad
                        busquedaAction={this.fetchEntidadesxParametro.bind(this)}
                        entidades={entidades}
                        setStateInstance={entidad => {
                            setState({entidad})
                        }}
                        searchText={searchText_entidad}
                        setSearchText={searchText_entidad => {
                            setState({searchText_entidad})
                        }}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <BuscarMedicoRemitente
                        busquedaAction={this.fetchMedicoRemitentexParametro.bind(this)}
                        medicos_remitentes={medicos_remitentes}
                        setStateInstance={medico_remitente => {
                            setState({medico_remitente})
                        }}
                        searchText={searchText_medico_remitente}
                        setSearchText={searchText_medico_remitente => {
                            setState({searchText_medico_remitente})
                        }}

                    />
                </div>
                <div className="col-12">
                    <BuscarPaciente
                        paciente={paciente}
                        pacientes={pacientes}
                        busquedaAction={this.fetchPacientesxParametro.bind(this)}
                        setStateInstance={paciente => {
                            setState({paciente})
                        }}
                        searchText={searchText_paciente}
                        setSearchText={searchText_paciente => {
                            setState({searchText_paciente})
                        }}
                    />
                </div>
                <div className="col-12 p-5">
                    <h2>Contacto Alternativo</h2>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Field name="nombre_contacto_alternativo"
                                   fullWidth={true}
                                   component={TextField}
                                   floatingLabelText="Nombre Contacto Alternativo"
                                   autoComplete="off"
                                   normalize={upper}
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <Field name="numero_contacto_alternativo"
                                   fullWidth={true}
                                   component={TextField}
                                   floatingLabelText="Número Contacto Alternativo"
                                   autoComplete="off"
                                   normalize={upper}
                            />
                        </div>
                        <div className="col-12">
                            <Field name="direccion_contacto_alternativo"
                                   fullWidth={true}
                                   component={TextField}
                                   floatingLabelText="Dirección Contacto Alternativo"
                                   autoComplete="off"
                                   normalize={upper}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrdenForm;
