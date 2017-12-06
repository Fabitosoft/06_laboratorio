import React, {Component} from 'react';
import {Field} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';

export default class ExamenesOrdenBusqueda extends Component {
    onNewRequest(value, tipo) {
        const {adicionarExamen} = this.props;
        adicionarExamen(value.value);
    }

    render() {
        const {examenes, orden} = this.props;
        if (examenes) {
            const autocopleteExamenes = _.map(examenes, examen => {
                return {
                    text: examen.examen_nombre,
                    value: {
                        ...examen,
                        examen: examen.examen_id,
                        valor_total: parseFloat(examen.valor_examen),
                        orden: orden.id,
                        descuento: 0,
                        valor_descuento: 0,
                        valor_final: parseFloat(examen.valor_examen)
                    }
                }
            });
            return (
                <div>
                    <AutoComplete
                        fullWidth={true}
                        floatingLabelText="Examenes"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={autocopleteExamenes}
                        onNewRequest={this.onNewRequest.bind(this)}
                    />
                </div>
            )
        } else {
            return <div>Sin Exámenes para Seleccionar</div>
        }
    }
}