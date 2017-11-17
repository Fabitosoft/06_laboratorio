import React, {Component} from 'react';
import {Field} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';

export default class BuscarEntidad extends Component {
    onNewRequest(value, tipo) {
        const {cambiarEntidad} = this.props;
        if (tipo === -1) {
            cambiarEntidad(null)
        } else {
            cambiarEntidad(value.value);
        }
    }

    render() {
        const {entidades, searchTextEntidad, setSearchTextEntidad} = this.props;

        const autocopleteEntidades = _.map(entidades, entidad => {
            return {
                text: entidad.nombre,
                value: entidad
            }
        });

        return (
            <AutoComplete
                fullWidth={true}
                floatingLabelText="Entidad"
                filter={AutoComplete.fuzzyFilter}
                dataSource={autocopleteEntidades}
                onNewRequest={this.onNewRequest.bind(this)}
                onUpdateInput={(searchText) => {
                    setSearchTextEntidad(searchText)
                }}
                searchText={searchTextEntidad}
            />
        )
    }
}