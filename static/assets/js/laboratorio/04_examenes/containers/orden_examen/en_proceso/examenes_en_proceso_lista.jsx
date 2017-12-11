import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../1_actions/01_index';

import SubGrupoCupsExamenesLista from '../../../components/orden_examen/examen/subgrupo_cups_examenes_lista';

class ExamenesEnProcesoLista extends Component {
    render() {
        const examenes_registrados = _.map(this.props.ordenes_examenes,
            examen => {
                return examen
            });
        const examenes_en_proceso = examenes_registrados.filter(examen => {
            return examen.examen_estado === 0
        });
        return (
            <SubGrupoCupsExamenesLista
                fetchAction={this.props.fetchOrdenesExamenesEnProceso}
                titulo="Exámenes en proceso"
                examenes_array={examenes_en_proceso}
                notificarAction={this.props.notificarAction}
            />

        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        ordenes_examenes: state.ordenes_examenes
    }
}

export default connect(mapPropsToState, actions)(ExamenesEnProcesoLista);