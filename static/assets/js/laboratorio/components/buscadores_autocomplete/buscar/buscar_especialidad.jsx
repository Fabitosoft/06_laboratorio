import React, {Component} from 'react';
import BusquedaAutoComplete from '../busqueda_autocoplete';

export default class BuscarEspecialidad extends Component {
    render() {
        const {especialidades, setStateInstance, busquedaAction, setSearchText, searchText, meta} = this.props;
        const autocopleteEspecialidades = _.map(especialidades, especialidad => {
            return {
                text: especialidad.nombre,
                value: especialidad
            }
        });
        return (
            <div>
                <BusquedaAutoComplete
                    dataSource={autocopleteEspecialidades.filter(especialidad => especialidad.value.activo_especialistas)}
                    label="Buscar especialidad..."
                    setStateInstance={setStateInstance}
                    busquedaAction={busquedaAction}
                    setSearchText={setSearchText}
                    searchText={searchText}
                    min_caracteres={2}
                />
                {meta.touched && meta.error &&
                <span className="form-field-error">{meta.error}</span>}
            </div>
        )
    }


}