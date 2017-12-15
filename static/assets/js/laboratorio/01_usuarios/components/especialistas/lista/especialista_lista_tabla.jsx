import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export default class Tabla extends Component {
    renderPaciente(especialista) {
        const {id, full_name, tipo_documento, nro_identificacion, is_active, especialidad_nombre, universidad, firma_url} = especialista;
        const link_to = `/app/especialista/editar/${id}`;
        let es_activo = null;
        if (is_active) {
            es_activo = <i
                className="fa fa-check-square"
                aria-hidden="true"
                onClick={() => {
                    this.props.actualizarEspecialista({
                        ...especialista,
                        is_active: false
                    }, 'Se ha inactivado el especialista')
                }}
            />
        } else {
            es_activo = <i
                className="fa fa-square-o"
                aria-hidden="true"
                onClick={() => {
                    this.props.actualizarEspecialista({
                        ...especialista,
                        is_active: true
                    }, 'Se ha activado el especialista')
                }
                }
            />
        }


        return (
            <tr key={id}>
                <td>{id}</td>
                <td><Link to={link_to}>{full_name.toUpperCase()}</Link></td>
                <td>{`${tipo_documento} ${nro_identificacion}`}</td>
                <td>{especialidad_nombre}</td>
                <td>{universidad}</td>
                <td>
                    <img className="img-fluid" style={{height: "100px"}} src={firma_url} alt=""/>
                </td>
                <td>{es_activo}</td>
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
                        <th>Especialidad</th>
                        <th>Universidad</th>
                        <th>Firma</th>
                        <th>Activo</th>
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