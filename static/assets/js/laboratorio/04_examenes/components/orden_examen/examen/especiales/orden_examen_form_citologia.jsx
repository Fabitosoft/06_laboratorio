import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import {
    TextField,
    Checkbox
} from "redux-form-material-ui";

const upper = value => value && value.toUpperCase();

class OrdenExamenFormCitologia extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            con_cambios_reactivos_secundarios: false,
            anor_epi_esca: false,
            insatisfactoria: false,
            les_esc_intr_alto_grado: false
        })
    }

    componentDidMount() {
        const {mi_citologia} = this.props;
        const con_cambios_reactivos_secundarios = mi_citologia.camb_react_secu;
        const anor_epi_esca = mi_citologia.anor_epi_esca_nat_ind;
        const insatisfactoria = mi_citologia.es_insatisfactoria;
        const les_esc_intr_alto_grado = mi_citologia.les_esc_intr_alto_grado;
        this.setState({con_cambios_reactivos_secundarios, anor_epi_esca, insatisfactoria, les_esc_intr_alto_grado})
    }

    render() {
        const {
            pristine,
            submitting,
            onSubmit,
            onFirmar,
            con_boton_firmar,
            handleSubmit,
            orden_examen: {examen_estado}
        } = this.props;

        const {
            con_cambios_reactivos_secundarios,
            anor_epi_esca,
            insatisfactoria,
            les_esc_intr_alto_grado
        } = this.state;

        let link_to = "/app/examenes/en_proceso/lista/";
        if (examen_estado === 1) {
            link_to = "/app/examenes/con_resultados/lista/";
        } else if (examen_estado === 2 || examen_estado === 3) {
            link_to = "/app/examenes/verificados/lista/";
        }

        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-12">
                                <h4>Citologia</h4>
                            </div>
                            <div className="col-12 pl-4">
                                <div className="row pl-4">
                                    <h5>Calidad de la muestra</h5>
                                    <div className="col-12">
                                        <Field name="es_insatisfactoria"
                                               onClick={() => {
                                                   this.setState({insatisfactoria: !insatisfactoria})
                                               }}
                                               component={Checkbox}
                                               label="Es Insatisfatoria"/>
                                    </div>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-md-4 col-lg-3">
                                                <Field name="hemorragico" component={Checkbox}
                                                       label="Hemorrágico"/>
                                            </div>
                                        </div>
                                        {
                                            !insatisfactoria ?
                                                <div className="row">
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <Field name="con_componente_endocervical"
                                                               component={Checkbox}
                                                               label="Con Componente Endocervical"/>
                                                    </div>
                                                </div> :
                                                <div className="row pl-4">
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <Field name="debe_repetir" component={Checkbox}
                                                               label="Repetir"/>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <Field name="celularidad_escasa" component={Checkbox}
                                                               label="Celularidad Escasa"/>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <Field name="mala_tincion" component={Checkbox}
                                                               label="Mala Tinción"/>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <Field name="mala_fijacion" component={Checkbox}
                                                               label="Mala Fijación"/>
                                                    </div>
                                                    <div className="col-12 col-md-4 col-lg-3">
                                                        <Field name="fondo_con_leucocitos" component={Checkbox}
                                                               label="Fondo con Leucocitos"/>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>


                            <div className="col-12 pl-4">
                                <div className="row pl-4">
                                    <h5>Microorganismos presentes</h5>
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-12 col-md-4 col-lg-3">
                                                <Field name="trichomonas" component={Checkbox} label="Trichomonas"/>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-3">
                                                <Field name="herpes" component={Checkbox} label="Herpes"/>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-3">
                                                <Field name="candida_sp" component={Checkbox} label="Candida SP"/>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-3">
                                                <Field name="vaginosis_bacteriana" component={Checkbox}
                                                       label="Vaginosis Bacteriana"/>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-3">
                                                <Field name="flora_anormal" component={Checkbox} label="Flora Anormal"/>
                                            </div>
                                            <div className="col-12 col-md-4 col-lg-3">
                                                <Field name="actinomyces" component={Checkbox} label="Actinomyces"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 pl-4">
                                <div className="row pl-4">
                                    <h5>Interpretación</h5>
                                    <div className="col-12">
                                        <Field name="nega_les_intraepi_malig" component={Checkbox}
                                               label="Negativo para lesion intraepitelial o malignidad"/>

                                        <Field name="camb_react_secu" onClick={() => {
                                            this.setState({con_cambios_reactivos_secundarios: !con_cambios_reactivos_secundarios})
                                        }} component={Checkbox}
                                               label="Cambios Reactivos Secundarios"/>
                                        {
                                            con_cambios_reactivos_secundarios &&
                                            <div className="row pl-4">
                                                <div className="col-12 col-md-4 col-lg-2">
                                                    <Field name="reparacion" component={Checkbox} label="Reparación"/>
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-2">
                                                    <Field name="inflamacion" component={Checkbox} label="Inflamación"/>
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-2">
                                                    <Field name="atrofia" component={Checkbox} label="Atrofia"/>
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-2">
                                                    <Field name="diu" component={Checkbox} label="DIU"/>
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-2">
                                                    <Field name="otro" component={Checkbox} label="Otro"/>
                                                </div>
                                            </div>
                                        }

                                        <Field name="camb_ind_papiloma" component={Checkbox}
                                               label="Cambios inducidos por Papiloma virus (VPH)"/>

                                        <Field name="anor_epi_esca_nat_ind"
                                               onClick={() => {
                                                   this.setState({anor_epi_esca: !anor_epi_esca})
                                               }}
                                               component={Checkbox}
                                               label="Anormalidades del epitelio escamoso de naturaleza indeterminada"/>
                                        {
                                            anor_epi_esca &&
                                            <div className="row pl-4">
                                                <div className="col-12 col-md-4 col-lg-2">
                                                    <Field name="asc_us" component={Checkbox}
                                                           label="ASC-US"/>
                                                </div>
                                                <div className="col-12 col-md-4 col-lg-2">
                                                    <Field name="asc_h" component={Checkbox}
                                                           label="ASC-H"/>
                                                </div>
                                            </div>
                                        }


                                        <Field name="nci_i" component={Checkbox}
                                               label="Lesión escamosa intraepitelial de bajo grado (displasia leve NIC. I)"/>

                                        <Field name="les_esc_intr_alto_grado"
                                               onClick={() => {
                                                   this.setState({les_esc_intr_alto_grado: !les_esc_intr_alto_grado})
                                               }}
                                               component={Checkbox}
                                               label="Lesión escamosa intraepitelial de alto grado"/>
                                        {
                                            les_esc_intr_alto_grado &&
                                            <div className="row pl-4">
                                                <div className="col-12 col-lg-4">
                                                    <Field name="nci_ii" component={Checkbox}
                                                           label="(Displasia moderada NIC II)"/>
                                                </div>
                                                <div className="col-12 col-lg-4">
                                                    <Field name="nci_iii" component={Checkbox}
                                                           label="(Displasia severa /Carcinoma in situ NIC III)"/>
                                                </div>
                                            </div>
                                        }

                                        <Field name="carc_esca_inv" component={Checkbox}
                                               label="Carcinoma escamocelular invasivo"/>
                                        <Field name="anor_epi_glan_nat_inde" component={Checkbox}
                                               label="Anomalidades del epitelio glandular de naturaleza indeterminada"/>
                                        <Field name="adenocarcinoma" component={Checkbox} label="Adenocarcinoma"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Link to={link_to}>
                                    <button type="button" className="btn btn-secondary">
                                        Cancelar
                                    </button>
                                </Link>
                                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>
                                    Guardar
                                </button>
                                {
                                    con_boton_firmar && <button type="button" onClick={() => {
                                        onFirmar()
                                    }} className="btn btn-primary">
                                        Firmar
                                    </button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )

    }
}

function mapPropsToState(state, ownProps) {
    const {mi_citologia} = ownProps;
    return {
        initialValues: mi_citologia
    }
}

OrdenExamenFormCitologia = reduxForm({
    form: "OrdenExamenCitologiaForm",
    enableReinitialize: true
})(OrdenExamenFormCitologia);

OrdenExamenFormCitologia = (connect(mapPropsToState, null)(OrdenExamenFormCitologia));

export default OrdenExamenFormCitologia;
