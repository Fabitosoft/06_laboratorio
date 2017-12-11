import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';
import BuscarExamen from '../../../components/buscadores_autocomplete/buscar/buscar_examen';
import {formatMoney} from 'accounting';
import {
    TextField
} from 'redux-form-material-ui'

import validate from './validate';

class ExamenEntidadCrear extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            examen: null,
            searchText_examen: ''
        })
    }

    componentDidMount() {
        const {fetchEntidad, match: {params: {id_entidad}}} = this.props;
        fetchEntidad(id_entidad);
    }

    onSubmit(values) {
        const {crearExamenEntidad, match: {params: {id_entidad}}, notificarAction} = this.props;
        const examen = {...values, entidad: id_entidad, examen: this.state.examen.id};
        crearExamenEntidad(examen, response => {
            notificarAction(`Se ha agregado el examen ${response.examen_nombre} con valor ${formatMoney(Number(values.valor_examen), "$", 0, ".", ",")}`, null, 7000);
            this.props.history.push(`/app/entidades/editar/${id_entidad}`);
        });
    }

    renderBotonGuardar() {
        const {
            pristine,
            submitting
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
            examenes,
            fetchExamenesxParametro
        } = this.props;
        const cancelar_link_to = `/app/entidades/editar/${id_entidad}`;
        const {examen, searchText_examen} = this.state;

        if (!entidad) {
            return (
                <div>Cargando...</div>
            )
        }

        const examenes_actuales = entidad.mis_examenes.map(examen => {
            return (examen.examen_id)
        });

        const autocopleteExamenes = _.pickBy(examenes, examen => {
            return !examenes_actuales.includes(examen.id)
        });

        let mi_costo_referencia = null;
        if (examen) {
            const {costo_referencia} = examen;
            mi_costo_referencia = `Costo Referencia: ${formatMoney(Number(costo_referencia), "$", 0, ".", ",")}`
        }

        return (
            <div>
                <h1>Crear Examen Entidad</h1>
                <BuscarExamen
                    examenes={autocopleteExamenes}
                    busquedaAction={fetchExamenesxParametro}
                    setStateInstance={examen => {
                        this.setState({examen})
                    }}
                    searchText={searchText_examen}
                    setSearchText={searchText_examen => {
                        this.setState({searchText_examen})
                    }}
                />
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="valor_examen"
                           fullWidth={true}
                           component={TextField}
                           floatingLabelText="Valor"
                           autoComplete="off"
                           hintText={mi_costo_referencia}
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
