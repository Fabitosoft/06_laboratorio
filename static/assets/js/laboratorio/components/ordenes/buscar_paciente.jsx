import React, {Component} from 'react';
import {Field} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';

export default class BuscarPaciente extends Component {
    onUpdateInput(textoBuscado) {
        const {cambiarPaciente, fetchPacientesxParametro, setSearchTextPaciente} = this.props;
        setSearchTextPaciente(textoBuscado);
        cambiarPaciente(null);
        if (textoBuscado.length > 3) {
            fetchPacientesxParametro(textoBuscado);
        }
    }

    onNewRequest(value, tipo) {
        const {cambiarPaciente} = this.props;
        if (tipo === -1) {
            cambiarPaciente(null)
        } else {
            cambiarPaciente(value.value);
        }
    }

    renderInfoPaciente() {
        const {paciente} = this.props;
        if (paciente) {
            const {
                nombre,
                nombre_segundo,
                apellido,
                apellido_segundo,
                nro_identificacion,
                tipo_documento,
                email,
                telefono
            } = paciente;
            const nombre_paciente = `${nombre} ${nombre_segundo} ${apellido} ${apellido_segundo}`;
            return (
                <div className="row">
                    <div className="col-12 col-md-6">Nombre: {nombre_paciente}</div>
                    <div className="col-12 col-md-6">Identificacion: {`${nro_identificacion} ${tipo_documento}`}</div>
                    <div className="col-12 col-md-6">Email: {email}</div>
                    <div className="col-12 col-md-6">Teléfono: {telefono}</div>
                </div>
            )
        }
    }

    render() {
        const {pacientes, searchTextPaciente} = this.props;
        const autocopletePacientes = _.map(pacientes, paciente => {
            return {
                text: paciente.nro_identificacion,
                value: paciente
            }
        });

        return (
            <div className="row">
                <div className="col-12">
                    <AutoComplete
                        fullWidth={true}
                        floatingLabelText="Paciente"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={autocopletePacientes}
                        onNewRequest={this.onNewRequest.bind(this)}
                        onUpdateInput={this.onUpdateInput.bind(this)}
                        searchText={searchTextPaciente}
                    />
                </div>
                <div className="col-12">
                    {this.renderInfoPaciente()}
                </div>
            </div>
        )
    }
}