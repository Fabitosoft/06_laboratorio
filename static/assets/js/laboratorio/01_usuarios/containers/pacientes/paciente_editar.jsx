import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';

import PacienteEditarForm from '../../components/pacientes/paciente_form_editar';


class PacienteEditar extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            cedula: null,
            mostrar_solo_codigo_barras: false
        })
    }

    componentDidMount() {
        const {match: {params: {id}}, fetchPaciente, fetchMisPermisos} = this.props;
        fetchPaciente(id);
        fetchMisPermisos();
    }

    onSubmit(values) {
        const {updatePaciente, notificarAction, fetchPaciente} = this.props;
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        console.log('entro a editar')
        updatePaciente(values,
            (response) => {
                fetchPaciente(response.id, paciente => {
                    notificarAction(`Se ha editado con éxito el paciente ${paciente.full_name}`);
                });
            },
            error_callback
        );
    }

    render() {
        const {paciente, mis_permisos} = this.props;
        return (
            <div className="row">
                <div className="col-12">
                    <h3 className="h3-responsive">Editar Paciente</h3>
                </div>
                <div className="col-12">
                    <PacienteEditarForm
                        mis_permisos={mis_permisos}
                        onSubmit={this.onSubmit.bind(this)}
                        paciente={paciente}
                    />
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        paciente: state.pacientes[id],
        mis_permisos: state.mis_permisos
    }
}

export default connect(mapPropsToState, actions)(PacienteEditar);
