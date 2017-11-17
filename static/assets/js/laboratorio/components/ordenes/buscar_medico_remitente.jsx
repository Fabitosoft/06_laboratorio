import React, {Component} from 'react';
import {Field} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';

export default class BuscarMedicoRemitente extends Component {
    onUpdateInput(textoBuscado) {
        const {cambiarMedicoRemitente, setSearchTextMedicoRemitente} = this.props;
        setSearchTextMedicoRemitente(textoBuscado);
        cambiarMedicoRemitente(null);
        const {fetchMedicoRemitentexParametro} = this.props;
        if (textoBuscado.length > 3) {
            fetchMedicoRemitentexParametro(textoBuscado);
        }
    }

    onNewRequest(value, tipo) {
        const {cambiarMedicoRemitente} = this.props;
        if (tipo === -1) {
            cambiarMedicoRemitente(null)
        } else {
            cambiarMedicoRemitente(value.value);
        }
    }

    render() {
        const {medicosRemitentes, searchTextMedicoRemitente} = this.props;
        const autocopleteMedicosRemitentes = _.map(medicosRemitentes, medicoRemiente => {
            return {
                text: medicoRemiente.getFullName,
                value: medicoRemiente
            }
        });


        return (
            <AutoComplete
                fullWidth={true}
                floatingLabelText="Médico Remitente"
                filter={AutoComplete.fuzzyFilter}
                dataSource={autocopleteMedicosRemitentes}
                onNewRequest={this.onNewRequest.bind(this)}
                onUpdateInput={this.onUpdateInput.bind(this)}
                searchText={searchTextMedicoRemitente}
            />
        )
    }
}