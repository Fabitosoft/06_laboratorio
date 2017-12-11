import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../1_actions/01_index';
import {SubmissionError} from 'redux-form';

import EspecialistaEditarForm from '../../components/especialistas/especialista_form_editar';


class EspecialistaEditar extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            especialidad: null,
            searchText_especialidad: '',
            firma: null
        })
    }

    componentDidMount() {
        const error_callback = (error) => {
            this.props.notificarErrorAjaxAction(error);
        };
        const {match: {params: {id}}, fetchEspecialista, fetchEspecialidad} = this.props;
        fetchEspecialista(id,
            especialista => {
                fetchEspecialidad(especialista.especialidad,
                    especialidad => {
                        this.setState({especialidad, searchText_especialidad: especialidad.nombre})
                    },
                    error_callback
                )
            },
            error_callback
        );
    }

    onChangeFirma(e) {
        const {match: {params: {id}}, notificarAction, notificarErrorAjaxAction} = this.props;
        const error_callback = (error) => {
            notificarErrorAjaxAction(error);
        };
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('firma', file);
        this.props.updateEspecialistaFirma(id, formData,
            especialista => {
                this.props.fetchEspecialista(especialista.id,
                    (cosa) => {
                        notificarAction(`La firma se ha cambiado para ${especialista.full_name}`);
                    },
                    error_callback
                )
            },
            error_callback
        )
    }

    onSubmit(values) {
        const {updateEspecialista, notificarAction, fetchEspecialista, fetchEspecialidad, notificarErrorAjaxAction} = this.props;
        const error_callback = (error) => {
            notificarErrorAjaxAction(error);
        };
        if (!this.state.especialidad) {
            throw new SubmissionError({especialidad: 'Requerido'});
        } else {
            const especialista_editado = {
                ...values,
                especialidad: this.state.especialidad ? this.state.especialidad.id : null
            };
            updateEspecialista(
                especialista_editado,
                (response) => {
                    fetchEspecialista(
                        response.id,
                        especialista => {
                            fetchEspecialidad(
                                especialista.especialidad,
                                especialidad => {
                                    this.setState({especialidad, searchText_especialidad: especialidad.nombre});
                                    notificarAction(`Se ha editado con éxito el especialista ${especialista.full_name}`);
                                    throw new SubmissionError({especialidad: null});
                                },
                                //error_callback
                            )
                        },
                        error_callback
                    );
                },
                error_callback
            );
        }
    }

    render() {
        const {especialista} = this.props;
        const {searchText_especialidad} = this.state;

        let firma_imagen = null;
        if (especialista) {
            firma_imagen = <img className="img-fluid" src={especialista.firma_url}/>
        }
        return (
            <div className="row">
                <div className="col-12">
                    <h3 className="h3-responsive">Editar Especialista</h3>
                </div>
                <div className="col-12">
                    <EspecialistaEditarForm
                        onSubmit={this.onSubmit.bind(this)}
                        especialista={especialista}
                        searchText_especialidad={searchText_especialidad}
                        setState={this.setState.bind(this)}
                    />
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12">
                            <h4>Firma</h4>
                        </div>
                        <div className="col-3">
                            {firma_imagen}
                        </div>
                        <div className="col-12">
                            <input type="file" onChange={this.onChangeFirma.bind(this)} accept=".jpg, .jpeg, .png"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapPropsToState(state, ownProps) {
    const {match: {params: {id}}} = ownProps;
    return {
        especialista: state.especialistas[id]
    }
}

export default connect(mapPropsToState, actions)(EspecialistaEditar);
