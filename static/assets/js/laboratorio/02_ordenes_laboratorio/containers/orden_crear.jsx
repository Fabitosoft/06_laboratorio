import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';
import {Link} from 'react-router-dom';
import {reduxForm} from 'redux-form';

import OrdenForm from '../components/orden_form';

class CrearOrdenLaboratorio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paciente: null,
            medico_remitente: null,
            entidad: null,
            searchText_entidad: "",
            searchText_paciente: "",
            searchText_medico_remitente: ""
        }
    }

    renderBotonCrearOrden() {
        const {pristine, submitting} = this.props;
        const {paciente, entidad} = this.state;
        if (paciente && entidad) {
            return (
                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                    Crear Orden de Laboratorio
                </button>
            )
        }
    }

    onSubmit(values) {
        const {crearOrden, notificarAction} = this.props;
        const {paciente, entidad, medico_remitente} = this.state;
        let nueva_orden = {
            ...values,
            valor_total: 0,
            valor_descuento: 0,
            valor_final: 0,
            paciente: paciente.id,
            entidad: entidad.id
        };
        if (medico_remitente) {
            nueva_orden = {...nueva_orden, medico_remitente: medico_remitente.id};
        }

        const callback = (response) => {
            notificarAction(`Se ha creado la orden de laboratorio nro: ${response.id}`);
            this.props.history.push(`/app/ordenes_laboratorio/detail/${response.id}`);
        };

        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        crearOrden(nueva_orden, callback, error_callback)
    }

    render() {
        const {
            pristine,
            submitting,
            reset,
            handleSubmit,
        } = this.props;
        document.title = 'Crear Orden Laboratorio';
        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="row p-4" id="react-no-print">
                        <div className="col-12">
                            <h3>{document.title}</h3>
                        </div>
                        <div className="col-12">
                            <OrdenForm
                                {...this.props}
                                {...this.state}
                                setState={this.setState.bind(this)}
                            />
                        </div>
                        <div className="col-12">
                            {this.renderBotonCrearOrden()}
                            <button type="button" className="btn btn-secondary" disabled={pristine || submitting}
                                    onClick={reset}>
                                Limpiar
                            </button>
                            <Link to="/app/ordenes_laboratorio/lista/">
                                <button type="button" className="btn btn-secondary">
                                    Cancelar
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        entidades: state.entidades,
        medicos_remitentes: state.medicos_remitentes,
        pacientes: state.pacientes
    }
}

CrearOrdenLaboratorio = reduxForm({
    form: "ordenCrearForm",
    enableReinitialize: true
})(CrearOrdenLaboratorio);

export default (connect(mapPropsToState, actions)(CrearOrdenLaboratorio));
