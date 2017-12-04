import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class TablaContactos extends Component {
    renderContacto(contacto) {
        const {id, nombre, enviar_correo, correo_electronico} = contacto;
        const {actualizarContactoEntidad, traerEntidad, eliminarContactoEntidad, notificarAction} = this.props;
        let es_enviar_correo = null;
        if (enviar_correo) {
            es_enviar_correo = <i
                className="fa fa-check-square"
                aria-hidden="true"
                onClick={() => {
                    actualizarContactoEntidad({...contacto, enviar_correo: false}, () => {
                        notificarAction(`Se deshabilitó el envío de correo para ${nombre}`);
                        traerEntidad(contacto.entidad);
                    })
                }
                }
            />
        } else {
            es_enviar_correo = <i
                className="fa fa-square-o"
                aria-hidden="true"
                onClick={() => {
                    actualizarContactoEntidad({...contacto, enviar_correo: true}, () => {
                        notificarAction(`Se habilitó el envío de correo para ${nombre}`);
                        traerEntidad(contacto.entidad);
                    })
                }
                }
            />
        }
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{nombre}</td>
                <td>{correo_electronico}</td>
                <td>{es_enviar_correo}</td>
                <td>
                    <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                        onClick={() => {
                            eliminarContactoEntidad(contacto, () => {
                                notificarAction(`Se ha eliminado ${nombre} de los contactos`);
                                traerEntidad(contacto.entidad);
                            })
                        }
                        }
                    />
                </td>
            </tr>
        )
    }

    render() {
        const {contactos} = this.props;
        return (
            <div>
                <table className="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Enviar Correo</th>
                        <th>Borrar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        contactos.sort((a, b) => {
                            return a.id - b.id
                        }).map(contacto => {
                            return this.renderContacto(contacto)
                        })
                    }
                    </tbody>
                </table>
            </div>

        )
    }
}