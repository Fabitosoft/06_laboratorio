import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';

import OrdenExamenForm from '../../components/orden_examen/examen/orden_examen_form_editar';
import ExamenHistorialLista from '../../components/orden_examen/examen/historial/examen_historial_lista';

class OrdenExamenDetail extends Component {

    constructor(props) {
        super(props);
        this.state = ({ver_historial: false})
    }

    componentDidMount() {
        const {match: {params: {id}}, fetchOrdenExamen} = this.props;
        fetchOrdenExamen(id);
    }

    onSubmit(values) {
        const {updateOrdenExamen, notificarAction, fetchOrdenExamen} = this.props;
        updateOrdenExamen(values, response => {
            fetchOrdenExamen(response.id, () => {
                    notificarAction('Se ha guardado correctamente los resultados del exámen')
                }
            );
        });
        // const {updateOrden, notificarAction, fetchOrden} = this.props;
        // const {paciente, entidad, medico_remitente} = this.state;
        // let orden_editada = {
        //     ...values,
        //     paciente: paciente.id,
        //     entidad: entidad.id
        // };
        // if (medico_remitente) {
        //     orden_editada = {...orden_editada, medico_remitente: medico_remitente.id};
        // }
        //
        // const callback = (response) => {
        //     fetchOrden(response.id, orden => {
        //         notificarAction(`Se ha actualizado la orden de laboratorio nro: ${orden.id}`);
        //     })
        // };
        // updateOrden(orden_editada, callback)
    }

    render() {
        const {orden_examen} = this.props;
        if (!orden_examen)
            return (
                <div>
                    cargando...
                </div>
            );
        return (
            <div className="row">
                <div className="col-12">
                    <h4>{orden_examen.examen_nombre}</h4>
                    <h6>{orden_examen.sub_categoria_cup_nombre.toUpperCase()}</h6>
                    <h6><strong>Entidad</strong>: {orden_examen.entidad_nombre}</h6>
                    <h6><strong>Paciente:</strong> {orden_examen.paciente_nombre}</h6>
                    <h6><strong>Orden:</strong> {orden_examen.orden}</h6>
                </div>
                <div className="col-12">
                    <OrdenExamenForm
                        onSubmit={this.onSubmit.bind(this)}
                        orden_examen={orden_examen}
                    />
                </div>
                <div className="col-12 mt-2">
                    <button type="button" className="btn btn-primary" onClick={() => {
                        this.setState({ver_historial: !this.state.ver_historial})
                    }}>
                        {!this.state.ver_historial ? "Ver Historial" : "Ocultar Historial"}
                    </button>
                </div>

                <div className="col-12 mt-2">
                    {this.state.ver_historial ? <ExamenHistorialLista mis_bitacoras={orden_examen.mis_bitacoras}/> :
                        <div></div>}
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        orden_examen: state.ordenes_examenes[id]
    }
}

export default (connect(mapPropsToState, actions)(OrdenExamenDetail));
