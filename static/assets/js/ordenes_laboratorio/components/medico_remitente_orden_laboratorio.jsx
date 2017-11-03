import React, {Component} from 'react';
import {Field} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';

export default class MedicoRemitente extends Component {
    onUpdateInput(textoBuscado) {
        if (textoBuscado.length > 3) {
            this.props.fetchMedicoRemitentexParametro(textoBuscado);
        }
    }

    onNewRequest(value) {
        const {cambiarMedicoRemitente} = this.props;
        cambiarMedicoRemitente(value.value);
    }

    render() {
        const {medicosRemitentes} = this.props;
        const autocopleteMedicosRemitentes = _.map(medicosRemitentes, medicoRemiente => {
            return {
                text: medicoRemiente.getFullName,
                value: medicoRemiente
            }
        });

        return (
            <div className='row'>
                <div className="col-12">
                    <AutoComplete
                        fullWidth={true}
                        floatingLabelText="Médico Remitente"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={autocopleteMedicosRemitentes}
                        onNewRequest={this.onNewRequest.bind(this)}
                        onUpdateInput={this.onUpdateInput.bind(this)}
                    />
                </div>
            </div>
        )
    }
}