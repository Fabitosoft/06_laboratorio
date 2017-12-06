import React, {Component} from 'react';
import BusquedaAutoComplete from '../busqueda_autocoplete';

export default class BuscarPaciente extends Component {
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
        const {pacientes, setStateInstance, busquedaAction, setSearchText, searchText} = this.props;
        const autocoplete = _.map(pacientes, paciente => {
            return {
                text: paciente.nro_identificacion,
                value: paciente
            }
        });

        return (
            <div className="row">
                <div className="col-12">
                    <BusquedaAutoComplete
                        dataSource={autocoplete}
                        label="Buscar paciente..."
                        setStateInstance={setStateInstance}
                        busquedaAction={busquedaAction}
                        setSearchText={setSearchText}
                        searchText={searchText}
                    />
                </div>
                <div className="col-12">
                    {this.renderInfoPaciente()}
                </div>
            </div>
        )
    }
}