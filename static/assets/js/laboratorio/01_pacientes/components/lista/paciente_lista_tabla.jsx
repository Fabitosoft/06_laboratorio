import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export default class Tabla extends Component {
    renderPaciente(paciente) {
        const {id, full_name, tipo_documento, nro_identificacion, email, telefono, telefono_2} = paciente;
        const link_to = `/app/paciente/editar/${id}`;
        return (
            <tr key={id}>
                <td>{id}</td>
                <td><Link to={link_to}>{full_name.toUpperCase()}</Link></td>
                <td>{`${tipo_documento} ${nro_identificacion}`}</td>
                <td>{email}</td>
                <td>{telefono}</td>
                <td>{telefono_2}</td>
            </tr>
        )
    }

    render() {
        const {pacientes} = this.props;
        return (
            <div>
                <table className="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Email</th>
                        <th>Tel.</th>
                        <th>Tel. 2</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(pacientes, paciente => {
                        return this.renderPaciente(paciente)
                    })}
                    </tbody>
                </table>
            </div>

        )
    }
}