import React, {Component} from 'react';
import BusquedaAutoComplete from './../../../components/buscadores_autocomplete/busqueda_autocoplete';

export default class BuscarEntidad extends Component {
    render() {
        const {entidades, setStateInstance, busquedaAction, setSearchText, searchText} = this.props;
        const autocopleteEntidades = _.map(entidades, entidad => {
            return {
                text: entidad.nombre,
                value: entidad
            }
        });
        return (
            <BusquedaAutoComplete
                dataSource={autocopleteEntidades}
                label="Buscar entidad..."
                setStateInstance={setStateInstance}
                busquedaAction={busquedaAction}
                setSearchText={setSearchText}
                searchText={searchText}
            />
        )
    }
}