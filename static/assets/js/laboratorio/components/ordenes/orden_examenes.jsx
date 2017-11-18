import React, {Component} from 'react';
import BuscarExamen from '../../components/ordenes/buscar_examen';
import OrdenExamenesTabla from '../../components/ordenes/orden_examenes_tabla';

export default class OrdenExamenes extends Component {
    renderBuscarExamen() {
        const {examenes, adicionarExamen, orden} = this.props;
        if (orden.estado === 0) {
            return (
                <BuscarExamen
                    examenes={examenes}
                    adicionarExamen={adicionarExamen}
                    orden={orden}
                />
            )
        }
    }

    render() {
        const {eliminarExamen, cambiarDescuento, orden} = this.props;
        return (
            <div className="col-12">
                <h2>Exámenes</h2>
                {this.renderBuscarExamen()}
                <OrdenExamenesTabla
                    orden={orden}
                    eliminarExamen={eliminarExamen}
                    cambiarDescuento={cambiarDescuento}
                />
            </div>
        )
    }
}