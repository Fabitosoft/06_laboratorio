import React, {Component} from 'react';
import BusquedaAutoComplete from '../busqueda_autocoplete';

export default class BuscarExamen extends Component {
    render() {
        const {examenes, setStateInstance, busquedaAction, setSearchText, searchText} = this.props;
        const autocoplete = _.map(examenes, examen => {
            return {
                text: examen.nombre,
                value: examen
            }
        });
        return (
            <div className="row">
                <div className="col-12">
                    <BusquedaAutoComplete
                        dataSource={autocoplete}
                        label="Buscar examen..."
                        setStateInstance={setStateInstance}
                        busquedaAction={busquedaAction}
                        setSearchText={setSearchText}
                        searchText={searchText}
                    />
                </div>
            </div>
        )
    }
}