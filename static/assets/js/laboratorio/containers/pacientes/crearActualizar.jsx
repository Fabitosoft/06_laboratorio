import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../1_actions/index';
import AutoComplete from 'material-ui/AutoComplete';


import CrearActializarForm from '../../components/pacientes/crear_actualizar_form';

class PacienteCrearActualizar extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            paciente: null,
            textoBuscado: '',
            mensaje: ''
        })
    }

    onSubmit(values) {
        const {paciente} = this.state;
        const callback_actualizado = (response) => {
            this.setState({
                paciente: response,
                mensaje: 'Se há actualizado al paciente correctamente'
            });
        };
        const callback_creado = (response) => {
            this.setState({
                paciente: response,
                mensaje: 'Se há creado al paciente correctamente'
            });
        };
        if (paciente) {
            this.props.updatePaciente(values, callback_actualizado);
        } else {
            this.props.crearPaciente(values, callback_creado);
        }
    }

    onUpdateInput(textoBuscado) {
        this.setState({
            textoBuscado,
            paciente: null
        });
        if (textoBuscado.length > 3) {
            this.props.fetchPacientesxParametro(textoBuscado);
        }
    }

    onNewRequest(value, tipo) {
        if (tipo === -1) {
            this.setState({paciente: null})
        }
        else {
            this.setState({paciente: value.value})
        }
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
        this.setState({
            paciente: null,
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
                    fullWidth={true}
                    dataSource={autocoplete}
                    onNewRequest={this.onNewRequest.bind(this)}
                    onUpdateInput={this.onUpdateInput.bind(this)}
                    searchText={this.state.textoBuscado}
                />
            )
        }
    }

    render() {
        const {paciente, textoBuscado} = this.state;
        return (
            <div>
                <div className='row p-4'>
                    <div className='col-12'>
                        {this.renderBusquedaAutoComplete()}
                    </div>
                    <div className='col-12'>
                        <CrearActializarForm
                            paciente={paciente}
                            reset_paciente={this.reset_paciente.bind(this)}
                            onSubmit={this.onSubmit.bind(this)}
                            textoBuscado={textoBuscado}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    return {
        pacientes: state.pacientes
    }
}

PacienteCrearActualizar = (connect(mapPropsToState, actions)(PacienteCrearActualizar));

export default PacienteCrearActualizar;
