import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';
import {SubmissionError} from 'redux-form';

import EspecialistaCrearForm from '../../components/especialistas/especialista_form_crear';


class EspecialistaCrear extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            cedula: null,
            mostrar_solo_codigo_barras: false,
            especialidad: null,
            searchText_especialidad: ''
        })
    }

    onSubmit(values) {
        const {createEspecialista, notificarAction, notificarErrorAjaxAction, history} = this.props;
        if (!this.state.especialidad) {
            throw new SubmissionError({especialidad: 'Requerido'});
        } else {
            const error_callback = (error) => {
                notificarErrorAjaxAction(error);
            };
            const especialista = {
                ...values,
                especialidad: this.state.especialidad ? this.state.especialidad.id : null
            };
            createEspecialista(especialista, (response) => {
                notificarAction(`Se ha creado con éxito el especialista ${response.full_name}`);
                history.push(`/app/especialista/editar/${response.id}`);
            }, error_callback);
        }
    }

    render() {
        const {
            mostrar_solo_codigo_barras,
            cedula,
            searchText_especialidad
        } = this.state;
        return (
            <div className="row">
                <div className="col-12">
                    <h3 className="h3-responsive">Crear Especialista</h3>
                </div>
                <div className="col-12">
                    <EspecialistaCrearForm
                        onSubmit={this.onSubmit.bind(this)}
                        cedula={cedula}
                        mostrar_solo_codigo_barras={mostrar_solo_codigo_barras}
                        cargarDatosDesdeLector={cedula => {
                            this.setState(cedula)
                        }}
                        mostrarSoloParaCodigoBarras={mostrar_solo_codigo_barras => {
                            this.setState({mostrar_solo_codigo_barras})
                        }}
                        opcion_barras={true}
                        searchText_especialidad={searchText_especialidad}
                        setState={this.setState.bind(this)}
                    />
                </div>
            </div>
        )
    }
}


export default connect(null, actions)(EspecialistaCrear);
