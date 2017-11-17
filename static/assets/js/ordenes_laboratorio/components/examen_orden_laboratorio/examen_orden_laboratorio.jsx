import React, {Component} from 'react';
import {Field} from 'redux-form';
import AutoComplete from 'material-ui/AutoComplete';
import TablaExamenes from '../examen_orden_laboratorio/tabla_examenes';

export default class ExamenesOrdenBusqueda extends Component {
    onNewRequest(value) {
        const {adicionarExamen} = this.props;
        adicionarExamen(value.value);
    }

    renderAutocomplete(autocopleteExamenes) {
        return (
            <AutoComplete
                fullWidth={true}
                floatingLabelText="Examenes"
                filter={AutoComplete.fuzzyFilter}
                dataSource={autocopleteExamenes}
                onNewRequest={this.onNewRequest.bind(this)}
            />
        )
    }

    render() {
        const {entidad, examenesOrden, eliminarExamen, cambiarDescuento} = this.props;
        if (entidad) {
            const autocopleteExamenes = _.map(entidad.mis_examenes, examen => {
                return {
                    text: examen.examen.nombre,
                    value: {
                        ...examen.examen,
                        valor: parseInt(examen.valor_examen),
                        descuento: 0,
                        valor_descuento: 0,
                        valor_final: parseInt(examen.valor_examen)
                    }
                }
            });
            return (
                <div>
                    {this.renderAutocomplete(autocopleteExamenes)}
                    <TablaExamenes
                        {...this.props}
                    />
                </div>
            )
        } else {
            return <div>Sin Exámenes para Seleccionar</div>
        }
    }
}