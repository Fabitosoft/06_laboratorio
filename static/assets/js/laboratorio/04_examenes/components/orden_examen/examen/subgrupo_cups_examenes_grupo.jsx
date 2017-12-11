import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SubGrupoCupsExamenesGrupo extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            solo_grupo: true
        })
    }

    renderExamen(examen) {
        const link_to = `/app/orden_examen/editar/${examen.id}`;
        return (
            <tr key={examen.id}>
                <td>{examen.orden}</td>
                <td>{examen.examen_nombre}</td>
                <td>{examen.paciente_nombre}</td>
                <td>{examen.entidad_nombre}</td>
                <td><Link to={link_to}>Ver</Link></td>
            </tr>
        )
    }

    filtrarPorNombreGrupo() {
        const {grupo} = this.props.grupo;
        const {setBusqueda} = this.props;
        const {solo_grupo} = this.state;
        if (solo_grupo) {
            setBusqueda(grupo);
        } else {
            setBusqueda("");
        }
        this.setState({solo_grupo: !solo_grupo})
    }

    render() {
        const {grupo, examenes} = this.props.grupo;
        return (
            <div className="col-12 col-xl-6">
                <h6>{grupo} <i className="fa fa-filter" onClick={() => {
                    this.filtrarPorNombreGrupo()
                }} aria-hidden="true"></i></h6>
                <table className="table table-responsive table-striped">
                    <thead>
                    <tr>
                        <th>Orden</th>
                        <th>Examen</th>
                        <th>Paciente</th>
                        <th>Entidad</th>
                        <th>Ver</th>
                    </tr>
                    </thead>
                    <tbody>
                    {examenes.map(examen => {
                        return this.renderExamen(examen)
                    })}
                    </tbody>
                </table>
            </div>

        )
    }
}