import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import {TextField} from "redux-form-material-ui";

const upper = value => value && value.toUpperCase();

class OrdenExamenFormBiopsia extends Component {
    render() {
        const {
            pristine,
            submitting,
            onSubmit,
            reset,
            onFirmar,
            con_boton_firmar,
            handleSubmit,
            orden_examen: {examen_estado}
        } = this.props;

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
                                <h4>Resultados Biopsia</h4>
                            </div>
                            <div className="col-12">
                                <Field
                                    fullWidth={true}
                                    name="descripcion_macroscopica"
                                    component={TextField}
                                    hintText="Descripción Macroscópica"
                                    floatingLabelText="Descripción Macroscópica"
                                    multiLine={true}
                                    rows={5}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-12">
                                <Field
                                    fullWidth={true}
                                    name="descripcion_microscopica"
                                    component={TextField}
                                    hintText="Descripción Microscópica"
                                    floatingLabelText="Descripción Microscópica"
                                    multiLine={true}
                                    rows={5}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-12">
                                <Field
                                    fullWidth={true}
                                    name="diagnostico"
                                    component={TextField}
                                    hintText="Diagnóstico"
                                    floatingLabelText="Diagnóstico"
                                    multiLine={true}
                                    rows={5}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="button" className="btn btn-secondary"
                                        onClick={reset}
                                        disabled={pristine || submitting}>
                                    Deshacer Cambios
                                </button>
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
    const {mi_biopsia} = ownProps;
    return {
        initialValues: mi_biopsia
    }
}

OrdenExamenFormBiopsia = reduxForm({
    form: "OrdenExamenBiopsiaForm",
    enableReinitialize: true
})(OrdenExamenFormBiopsia);

OrdenExamenFormBiopsia = (connect(mapPropsToState, null)(OrdenExamenFormBiopsia));

export default OrdenExamenFormBiopsia;
