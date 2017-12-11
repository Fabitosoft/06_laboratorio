import React, {Component} from 'react';
import BuscarExamen from '../../components/buscadores_autocomplete/buscar/buscar_entidad_examen';
import OrdenExamenesTabla from './orden_examenes_tabla';

export default class OrdenExamenes extends Component {
    constructor(props) {
        super(props);
        this.state = ({searchText_examen: ""})
    }

    renderBuscarExamen() {
        const {examenes, adicionarExamen, orden} = this.props;
        const {searchText_examen} = this.state;
        if (orden.estado === 0) {
            return (
                <BuscarExamen
                    examenes={examenes}
                    busquedaAction={() => {

                    }}
                    setStateInstance={examen => {
                        adicionarExamen(examen)
                    }}
                    searchText={searchText_examen}
                    setSearchText={searchText_examen => {
                        this.setState({searchText_examen})
                    }}
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