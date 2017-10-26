import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import validate from './validate';
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

    constructor(props) {
        super(props);
        this.state = ({
            textoBuscado: '',
            mensaje: ''
        })
    }

    onSubmit(values) {
        const {paciente, cambiarPaciente} = this.props;
        const callback = (response) => {
            cambiarPaciente(response.data);
            this.setState({
                mensaje: 'Se há actualizado al paciente correctamente'
            })
        };
        const callback_creado = (response) => {
            cambiarPaciente(response.data);
            this.setState({
                mensaje: 'Se há creado al paciente correctamente'
            });
        };
        if (paciente) {
            this.props.updatePaciente(values, callback);
        } else {
            this.props.crearPaciente(values, callback_creado);
        }
    }

    onUpdateInput(textoBuscado) {
        this.setState({textoBuscado});
        if (textoBuscado.length > 3) {
            this.props.fetchPacientesxParametro(textoBuscado);
        }
    }

    onNewRequest(value) {
        const {cambiarPaciente} = this.props;
        cambiarPaciente(value.value);
    }

    renderMensajePacienteEncontrado() {
        const {paciente} = this.props;
        if (paciente) {
            return (
                <div>
                    Se encontró
                    a {paciente.nombre} {paciente.nombre_segundo} {paciente.apellido} {paciente.apellido_segundo}
                </div>
            )
        }
    }

    reset_paciente() {
        const {cambiarPaciente} = this.props;
        cambiarPaciente(null);
        this.setState({
            mensaje: '',
            textoBuscado: ''
        })
    }

    renderBusquedaAutoComplete() {
        const {pacientes, paciente} = this.props;

        if (!paciente) {
            const autocoplete = _.map(pacientes, paciente => {
                return {
                    text: paciente.nro_identificacion,
                    value: paciente
                }
            });
            return (
                <AutoComplete
                    ref="autoComplete"
                    floatingLabelText="Buscar por documento"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={autocoplete}
                    onNewRequest={this.onNewRequest.bind(this)}
                    onUpdateInput={this.onUpdateInput.bind(this)}
                    searchText={this.state.textoBuscado}
                />
            )
        }
    }

    render() {
        const {handleSubmit, pristine, reset, submitting} = this.props;
        return (
            <div className='row'>
                <div className='col-12 col-sm-4'>
                    {this.renderBusquedaAutoComplete()}
                </div>
                <div className="col-12 col-sm-8">
                    {this.renderMensajePacienteEncontrado()}
                    {this.state.mensaje}
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
                                <button type="button" onClick={this.reset_paciente.bind(this)}>
                                    Limpiar
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
    return {
        initialValues: paciente,
    }
}

PacienteOrdenLaboratorioForm = reduxForm({
    form: "updatePacienteForm",
    enableReinitialize: true,
    validate
})(PacienteOrdenLaboratorioForm);

PacienteOrdenLaboratorioForm = (connect(mapPropsToState, null)(PacienteOrdenLaboratorioForm));

export default PacienteOrdenLaboratorioForm;
