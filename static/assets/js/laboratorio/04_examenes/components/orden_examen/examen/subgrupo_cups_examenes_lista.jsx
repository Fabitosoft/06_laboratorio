import React, {Component} from 'react';
import Grupo from './subgrupo_cups_examenes_grupo';
import TextField from 'material-ui/TextField';

export default class SubGrupoCupsExamenesLista extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            busqueda: ""
        })
    }

    componentDidMount() {
        this.cargarDatos();
    }

    cargarDatos() {
        this.props.fetchAction(response => {
            this.props.notificarAction('Se han traído los exámenes')
        })
    }


    render() {
        const {examenes_array, titulo} = this.props;
        const {busqueda} = this.state;
        let examenes_array_filtrados = examenes_array;
        if (busqueda !== "") {
            examenes_array_filtrados = examenes_array.filter(
                examen => {
                    return (
                        examen.orden.toString() === busqueda ||
                        examen.examen_nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                        examen.paciente_nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                        examen.entidad_nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                        examen.sub_categoria_cup_nombre.toLowerCase() === busqueda.toLowerCase()
                    )
                }
            )
        }

        const examenes_por_categoria = _.groupBy(examenes_array_filtrados, 'sub_categoria_cup_nombre');

        let sub_grupos_cups = [];
        _.mapKeys(examenes_por_categoria, (examenes, grupo) => {
            sub_grupos_cups = [...sub_grupos_cups, {"grupo": grupo, "examenes": examenes}]
        });
        return (
            <div className="row">
                <div className="col-12">
                    <h3>{titulo} <i className="fa fa-refresh cursor-pointer"
                                    onClick={() => {
                                        this.cargarDatos()
                                    }}
                                    aria-hidden="true"></i>
                    </h3>
                </div>
                <div className="col-12">
                    <TextField
                        floatingLabelText="A buscar"
                        fullWidth={true}
                        onChange={e => {
                            this.setState({busqueda: e.target.value})
                        }}
                        autoComplete="off"
                        value={busqueda}
                    />
                </div>
                {_.map(sub_grupos_cups, grupo => {
                    return <Grupo
                        key={grupo.grupo}
                        grupo={grupo}
                        setBusqueda={(busqueda) => {
                            this.setState({busqueda})
                        }}
                    />
                })}
            </div>

        )
    }
}