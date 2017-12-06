import React, {Component} from 'react';
import BusquedaAutoComplete from '../busqueda_autocoplete';

export default class BuscarMedicoRemitente extends Component {
    render() {
        const {medicos_remitentes, setStateInstance, busquedaAction, setSearchText, searchText} = this.props;
        const autocoplete = _.map(medicos_remitentes, medicoRemiente => {
            return {
                text: medicoRemiente.full_name,
                value: medicoRemiente
            }
        });
        return (
            <BusquedaAutoComplete
                dataSource={autocoplete}
                label="Buscar médicos remitentes..."
                setStateInstance={setStateInstance}
                busquedaAction={busquedaAction}
                setSearchText={setSearchText}
                searchText={searchText}
            />
        )
    }

}