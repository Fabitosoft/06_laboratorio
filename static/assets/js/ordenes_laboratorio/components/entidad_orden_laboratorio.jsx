import React, {Component} from 'react';
import {Field} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';

export default class EntidadLaboratorio extends Component {
    onNewRequest(value) {
        const {cambiarEntidad} = this.props;
        cambiarEntidad(value.value);
    }

    render() {
        const {entidades} = this.props;
        const autocopleteEntidades = _.map(entidades, entidad => {
            return {
                text: entidad.nombre,
                value: entidad
            }
        });

        return (
            <div className='row'>
                <div className="col-12">
                    <AutoComplete
                        fullWidth={true}
                        floatingLabelText="Entidad"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={autocopleteEntidades}
                        onNewRequest={this.onNewRequest.bind(this)}
                    />
                </div>
            </div>
        )
    }
}