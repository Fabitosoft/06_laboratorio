import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {reduxForm, Field} from 'redux-form';
import {TextField} from "redux-form-material-ui";

const upper = value => value && value.toUpperCase();

class OrdenExamenFormEditar extends Component {
    render() {
        const {
            pristine,
            submitting,
            onSubmit,
            reset,
            handleSubmit,
            con_boton_firmar,
            onFirmar,
            orden_examen: {examen_estado, examen_unidad_medida}
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
                                <h4>Resultados Examen</h4>
                            </div>
                            <div className="col-12 col-md-6">
                                <Field
                                    fullWidth={true}
                                    name="examen_valor_referencia"
                                    component={TextField}
                                    hintText="Valor de Referencia"
                                    floatingLabelText="Valor de Referencia"
                                    multiLine={true}
                                    rows={8}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row">
                                    <div className="col-12">
                                        <Field
                                            fullWidth={true}
                                            name="tecnica"
                                            component={TextField}
                                            hintText="Técnica"
                                            floatingLabelText="Técnica"
                                            normalize={upper}
                                            autoComplete="off"
                                        />
                                    </div>
                                    {
                                        examen_unidad_medida ?
                                            <div className="col-12">Unidad de Medida: {examen_unidad_medida}</div> :
                                            <div className="col-12">
                                                <Field
                                                    fullWidth={true}
                                                    name="examen_unidad_medida"
                                                    component={TextField}
                                                    hintText="Unidad"
                                                    floatingLabelText="Unidad Medida"
                                                    autoComplete="off"
                                                />
                                            </div>
                                    }
                                    <div className="col-12">
                                        <Field
                                            fullWidth={true}
                                            name="resultado"
                                            component={TextField}
                                            hintText="Resultado"
                                            floatingLabelText="Resultado"
                                            normalize={upper}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <Field
                                    fullWidth={true}
                                    name="observaciones"
                                    component={TextField}
                                    hintText="Observaciones"
                                    floatingLabelText="Observaciones"
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
    const {orden_examen} = ownProps;
    return {
        initialValues: orden_examen
    }
}

OrdenExamenFormEditar = reduxForm({
    form: "ordenExamenEditarForm",
    enableReinitialize: true
})(OrdenExamenFormEditar);

OrdenExamenFormEditar = (connect(mapPropsToState, null)(OrdenExamenFormEditar));

export default OrdenExamenFormEditar;
