import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/01_index';
import {Link} from 'react-router-dom';

class ExamenesPorResultadoLista extends Component {
    componentDidMount() {
        this.props.fetchOrdenesExamenesParaResultado()
    }

    render() {
        const {examenesPorResultado} = this.props;
        console.log(examenesPorResultado);
        return (
            <div>
                <h3>Exámenes esperando resultados</h3>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        examenesPorResultado: state.ordenesExamenes
    }
}

ExamenesPorResultadoLista = (connect(mapPropsToState, actions)(ExamenesPorResultadoLista));

export default ExamenesPorResultadoLista;
