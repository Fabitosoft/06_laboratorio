import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import validate from './validate';
import * as actions from '../../../1_actions/index';
import _ from 'lodash';
import {connect} from 'react-redux';
import moment from 'moment';
import momentLocaliser from 'react-widgets-moment';
import {Field, reduxForm} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';
import InformacionPersonalForm from '../../components/paciente_orden_laboratorio/informacion_personal_form';
import InformacionContactoForm from '../../components/paciente_orden_laboratorio/informacion_contacto_form';
import {
    Checkbox,
    RadioButtonGroup,
    SelectField,
    TextField,
    Toggle,
    DatePicker
} from 'redux-form-material-ui'

moment.locale('es');
momentLocaliser(moment);


class PacienteOrdenLaboratorioForm extends Component {
    onSubmit(values) {
        const {paciente, setState} = this.props;
        const callback = () => {
            console.log('entro a guardar');
        };
        const callback_creado = (response) => {
            console.log('entro a crear');
            setState({
                paciente: response.data
            });
        };
        if (paciente) {
            this.props.updatePaciente(values, callback);
        } else {
            this.props.crearPaciente(values, callback_creado);
        }
    }

    onUpdateInput(texto) {
        if (texto.length > 3) {
            this.props.fetchPacientesxParametro(texto);
        }
    }

    onNewRequest(value) {
        const {setState} = this.props;
        setState({
            paciente: value.value
        });
    }

    render() {
        const {pacientes, paciente, handleSubmit, load, pristine, reset, submitting} = this.props;

        const autocoplete = _.map(pacientes, paciente => {
            return {
                text: paciente.nro_identificacion,
                value: paciente
            }
        });

        let encontrado = null;

        if (paciente) {
            encontrado =
                <div>
                    Se encontró
                    a {paciente.nombre} {paciente.nombre_segundo} {paciente.apellido} {paciente.apellido_segundo}
                </div>
        }

        return (
            <div className='row'>
                <div className='col-12 col-sm-4'>
                    <AutoComplete
                        floatingLabelText="Número de Cedula"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={autocoplete}
                        onNewRequest={this.onNewRequest.bind(this)}
                        onUpdateInput={this.onUpdateInput.bind(this)}
                    />
                </div>
                <div className="col-12 col-sm-8">
                    {encontrado}
                </div>
                <div className='col-12'>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <div className="row">
                            <InformacionPersonalForm/>
                            <InformacionContactoForm/>
                            <div className="col-12">
                                <button type="submit" disabled={pristine || submitting}>
                                    Guardar
                                </button>
                                <button type="button" disabled={pristine || submitting} onClick={reset}>
                                    Deshacer Cambios
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )

    }
}

function mapPropsToState(state, ownProps) {
    const {paciente} = ownProps;
    let paciente_inicial = null;
    if (paciente) {
        paciente_inicial = paciente;
    }
    return {
        pacientes: state.pacientes,
        initialValues: paciente_inicial,
    }
}

PacienteOrdenLaboratorioForm = reduxForm({
    form: "updatePacienteForm",
    validate
})(PacienteOrdenLaboratorioForm);

PacienteOrdenLaboratorioForm = (connect(mapPropsToState, actions)(PacienteOrdenLaboratorioForm));

export default PacienteOrdenLaboratorioForm;
