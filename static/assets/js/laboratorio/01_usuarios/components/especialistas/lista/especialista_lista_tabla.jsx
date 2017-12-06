import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export default class Tabla extends Component {
    renderPaciente(especialista) {
        const {id, full_name, tipo_documento, nro_identificacion} = especialista;
        const link_to = `/app/especialista/editar/${id}`;
        return (
            <tr key={id}>
                <td>{id}</td>
                <td><Link to={link_to}>{full_name.toUpperCase()}</Link></td>
                <td>{`${tipo_documento} ${nro_identificacion}`}</td>
            </tr>
        )
    }

    render() {
        const {especialistas} = this.props;
        return (
            <div>
                <table className="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(especialistas, especialista => {
                        return this.renderPaciente(especialista)
                    })}
                    </tbody>
                </table>
            </div>

        )
    }
}