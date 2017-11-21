import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/index';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';
import {formatMoney} from 'accounting';
import {
    TextField
} from 'redux-form-material-ui'

import validate from '../mis_examenes/validate';

import {NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_TYPE_ERROR} from 'react-redux-notify';

class ExamenEntidadCrear extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            examen: null
        })
    }

    componentDidMount() {
        const {fetchEntidad, match: {params: {id_entidad}}} = this.props;
        fetchEntidad(id_entidad);
    }

    onUpdateInputExamenes(textoBuscado) {
        const {fetchExamenesxParametro} = this.props;
        if (textoBuscado.length > 3) {
            fetchExamenesxParametro(textoBuscado);
        } else {
            this.setState({examen: null});
        }
    }

    onNewRequestExamenes(examen, tipo) {
        //const {cambiarMedicoRemitente} = this.props;
        if (tipo === -1) {
            this.setState({examen: null});
        } else {
            this.setState({examen});
        }
    }

    onSubmit(values) {
        const {crearExamenEntidad, match: {params: {id_entidad}}} = this.props;
        const examen = {...values, entidad: id_entidad, examen: this.state.examen.value.id};
        crearExamenEntidad(examen, () => {
            this.props.history.push(`/app/entidades/editar/${id_entidad}`);
        });
    }

    renderBotonGuardar() {
        const {
            pristine,
            submitting,
        } = this.props;
        if (this.state.examen) {
            return (
                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                    Guardar
                </button>
            )
        }
    }

    render() {
        const {
            handleSubmit,
            pristine,
            reset,
            submitting,
            entidad,
            match: {params: {id_entidad}},
            examenes
        } = this.props;
        const cancelar_link_to = `/app/entidades/editar/${id_entidad}`;
        const {examen} = this.state;

        if (!entidad) {
            return (
                <div>Cargando...</div>
            )
        }

        const examenes_actuales = entidad.mis_examenes.map(examen => {
            return (examen.examen_id)
        });

        const examenes_nuevos = _.pickBy(examenes, examen => {
            return !examenes_actuales.includes(examen.id)
        });

        const autocopleteExamenes = _.map(examenes_nuevos, examen => {
            return {
                text: examen.nombre,
                value: examen
            }
        });

        let mi_costo_referencia = null;
        if (examen) {
            const {value: {costo_referencia}} = examen;
            mi_costo_referencia = `Costo Referencia: ${formatMoney(Number(costo_referencia), "$", 0, ".", ",")}`
        }

        return (
            <div>
                <h1>Crear Examen Entidad</h1>
                <AutoComplete
                    fullWidth={true}
                    floatingLabelText="Examenes"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={autocopleteExamenes}
                    onNewRequest={this.onNewRequestExamenes.bind(this)}
                    onUpdateInput={this.onUpdateInputExamenes.bind(this)}
                />
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="valor_examen"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Valor"
                           autoComplete="off"
                    />
                    <p>{mi_costo_referencia}</p>
                    {this.renderBotonGuardar()}
                    <button type="button" className="btn btn-secondary" disabled={pristine || submitting}
                            onClick={reset}>
                        Limpiar
                    </button>
                    <Link to={cancelar_link_to}>
                        <button type="button" className="btn btn-secondary">
                            Cancelar
                        </button>
                    </Link>
                </form>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id_entidad}}} = ownProps;
    return {
        entidad: state.entidades[id_entidad],
        examenes: state.examenes
    }
}


ExamenEntidadCrear = reduxForm({
    form: "examenEntidadCrearForm",
    validate,
    enableReinitialize: true
})(ExamenEntidadCrear);

export default (connect(mapPropsToState, actions)(ExamenEntidadCrear));
