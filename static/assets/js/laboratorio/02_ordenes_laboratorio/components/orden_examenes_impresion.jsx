import React, {Component} from 'react';
import PrintTemplate from 'react-print';
import ImpresionCabezote from '../../components/impresion/cabezote';
import ImpresionCabezoteDatosGeneralesRecibo from '../../components/impresion/cabezote_datos_generales_recibo';
import {formatMoney} from 'accounting';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");

export default class OrdenImpresionExamenes extends Component {

    renderExamen(examen) {
        console.log(examen)
        return (
            <tr key={examen.id}>
                <td>{examen.examen_nombre}</td>
                <td>{examen.resultado}</td>
                <td>{examen.examen_unidad_medida}</td>
                <td className={'text-multiline'}>{examen.examen_valor_referencia}</td>
                <td>{examen.tecnica ? examen.tecnica : ''}</td>
                <td className={'text-multiline'}>{examen.observaciones}</td>
            </tr>
        )
    }

    renderTabla(grupo, doctor = null) {
        const key = `${grupo.grupo}${doctor.especialista_id}`;
        return (
            <div key={key} className='row mt-2'>
                <div className="col-12 text-center">
                    <h5>{grupo.grupo}</h5>
                </div>
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Exámen</th>
                            <th>Resultado</th>
                            <th>Unidades</th>
                            <th>Valores de Referencia</th>
                            <th>Técnica</th>
                            <th>Observaciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {grupo.examenes.map(examen => {
                            return this.renderExamen(examen)
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderTablaMultifirma(examen) {
        return (
            <div key={examen.id} className='row mt-2'>
                <div className="col-12 text-center">
                    <h5>{examen.sub_categoria_cup_nombre}</h5>
                </div>
                <div className="col-12">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Exámen</th>
                            <th>Resultado</th>
                            <th>Unidades</th>
                            <th>Valores de Referencia</th>
                            <th>Técnica</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{examen.examen_nombre}</td>
                            <td>{examen.resultado}</td>
                            <td>{examen.examen_unidad_medida}</td>
                            <td className={'text-multiline'}>{examen.examen_valor_referencia}</td>
                            <td>{examen.tecnica ? examen.tecnica : ''}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="row text-center">
                        {examen.mis_firmas.map(doctor => {
                            return this.renderFirma({...doctor, especialista_id: doctor.especialista})
                        })}
                    </div>
                </div>
            </div>
        )

    }

    renderFirma(doctor = null) {
        return (
            <div key={doctor.especialista_id} className="col-3 m-0 p-0">
                <div className="col-12 m-0 p-0">
                    <img className="img-fluid" src={doctor.firma_url} alt=""/>
                </div>
                <div className="col-12" style={{marginTop: "-40px", fontSize: "8px"}}>
                    {doctor.firmado_por}<br/>
                    {doctor.especialidad}
                </div>
            </div>
        )
    }

    renderGrupo(examenes, doctor = null) {
        const examenes_por_categoria = _.groupBy(examenes, 'sub_categoria_cup_nombre');

        let sub_grupos_cups = [];
        _.mapKeys(examenes_por_categoria, (examenes, grupo) => {
            sub_grupos_cups = [...sub_grupos_cups, {"grupo": grupo, "examenes": examenes}]
        });
        return (
            <div key={doctor.especialista_id}>
                {
                    _.map(sub_grupos_cups, grupo => {
                        return this.renderTabla(grupo, doctor)
                    })
                }
                <div className="row text-center">
                    {this.renderFirma(doctor)}
                </div>
            </div>
        )
    }

    render() {
        const {
            orden,
            entidad,
            medico_remitente,
            paciente,
            examenes
        } = this.props;

        const multifirma = examenes.filter(examen => {
            return examen.mis_firmas.length > 1 && !examen.especial
        });
        const no_multifirma = examenes.filter(examen => {
            return examen.mis_firmas.length === 1 && !examen.especial
        });

        let doctores_no_multifirma = [];

        no_multifirma.map(examen => {
            const validacion_callback = doctor => {
                return doctor.especialista_id === examen.mis_firmas[0].especialista
            };

            if (examen.mis_firmas.length > 0) {
                if (!doctores_no_multifirma.some(validacion_callback)) {
                    doctores_no_multifirma.push(
                        {
                            especialista_id: examen.mis_firmas[0].especialista,
                            especialidad: examen.mis_firmas[0].especialidad,
                            firma_url: examen.mis_firmas[0].firma_url,
                            firmado_por: examen.mis_firmas[0].firmado_por
                        }
                    )
                }
            }
        });
        return (
            <PrintTemplate>
                <div id='imprimir' className="impresion-orden-laboratorio">
                    <ImpresionCabezote/>
                    <div className="orden mt-2">
                        <div className="row datos-generales">
                            <ImpresionCabezoteDatosGeneralesRecibo
                                orden={orden}
                                entidad={entidad}
                                medico_remitente={medico_remitente}
                                paciente={paciente}
                            />
                            <div className="col-12">
                                {
                                    doctores_no_multifirma.map(doctor => {
                                        const mis_examenes = no_multifirma.filter(examen => {
                                            if (examen.mis_firmas.length > 0) {
                                                return examen.mis_firmas[0].especialista === doctor.especialista_id
                                            }
                                        });
                                        return this.renderGrupo(mis_examenes, doctor);
                                    })
                                }
                                {
                                    multifirma.map(examen => {
                                        return this.renderTablaMultifirma(examen)
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </PrintTemplate>
        )
    }
}