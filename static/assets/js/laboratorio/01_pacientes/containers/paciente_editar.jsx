import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';

import PacienteEditarForm from '../components/paciente_form_editar';


class PacienteEditar extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            cedula: null,
            mostrar_solo_codigo_barras: false
        })
    }

    componentDidMount() {
        const {match: {params: {id}}, fetchPaciente} = this.props;
        fetchPaciente(id);
    }

    onSubmit(values) {
        const {updatePaciente, notificarAction, fetchPaciente} = this.props;
        updatePaciente(values, (response) => {
            fetchPaciente(response.id, paciente => {
                notificarAction(`Se ha editado con éxito el paciente ${paciente.full_name}`);
            });
        });
    }

    render() {
        const {paciente} = this.props;
        return (
            <div className="row">
                <div className="col-12">
                    <h3 className="h3-responsive">Editar Paciente</h3>
                </div>
                <div className="col-12">
                    <PacienteEditarForm
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
        paciente: state.pacientes[id]
    }
}

export default connect(mapPropsToState, actions)(PacienteEditar);
