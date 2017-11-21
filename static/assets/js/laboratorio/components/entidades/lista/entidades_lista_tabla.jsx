import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export default class Tabla extends Component {
    renderEntidad(entidad) {
        const {eliminarEntidad, actualizarEntidad, notificar} = this.props;
        const {id, nombre, nit, mis_examenes, activo} = entidad;
        const link_to = `/app/entidades/editar/${entidad.id}`;
        let borrar = null;
        let es_activo = null;
        if (mis_examenes.length === 0) {
            borrar = <i
                className="fa fa-trash-o"
                aria-hidden="true"
                onClick={() => {
                    eliminarEntidad(entidad, () => {
                        notificar(`Se há eliminado la entidad ${entidad.nombre}`)
                    })
                }
                }
            />
        }

        if (activo) {
            es_activo = <i
                className="fa fa-check-square"
                aria-hidden="true"
                onClick={() => {
                    actualizarEntidad({...entidad, activo: false}, response => {
                        notificar(`Se há inactivado la entidad ${response.nombre}`)
                    })
                }
                }
            />
        } else {
            es_activo = <i
                className="fa fa-square-o"
                aria-hidden="true"
                onClick={() => {
                    actualizarEntidad({...entidad, activo: true}, response => {
                        notificar(`Se há activado la entidad ${response.nombre}`)
                    })
                }
                }
            />
        }

        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{nit}</td>
                <td>
                    <Link to={link_to}>{nombre}</Link>
                </td>
                <td>{borrar}</td>
                <td>{es_activo}</td>
            </tr>
        )
    }

    render() {
        const {entidades} = this.props;
        return (
            <div>
                <table className="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nit</th>
                        <th>Nombre</th>
                        <th>Borrar</th>
                        <th>Activo</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.map(entidades, entidad => {
                        return this.renderEntidad(entidad)
                    })}
                    </tbody>
                </table>
            </div>

        )
    }
}