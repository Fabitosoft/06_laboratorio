import React, {Component} from 'react';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");

export default class ImpresionCabezoteDatosGeneralesRecibo extends Component {
    render() {
        const {
            orden,
            entidad,
            medico_remitente,
            paciente
        } = this.props;
        if (!entidad) {
            return (
                <div></div>
            )
        }

        const fechaOrden = moment(orden.created, "YYYY MM DD HH:mm:ss", "es").tz('America/Bogota');


        const fecha_nacimiento = moment(paciente.fecha_nacimiento, "YYYY MM DD", "es").tz('America/Bogota');
        const diferencia = fechaOrden.diff(fecha_nacimiento, "years");

        let mi_medico_remitente = null;
        if (medico_remitente) {
            mi_medico_remitente = <div className="col-6">
                <strong>Médico Remitente: </strong>
                {medico_remitente.nombres}
            </div>
        }
        return (
            <div className="orden mt-2">
                <div className="row datos-generales">
                    <div className="col-2">
                        <strong>Nro: </strong>
                        {orden.id}
                    </div>
                    <div className="col-3">
                        <strong>Fecha: </strong>
                        {fechaOrden.format("DD MMMM YYYY")}
                    </div>
                    <div className="col-2">
                        <strong>Hora: </strong>
                        {fechaOrden.format("hh:mm:ss a")}
                    </div>
                    <div className="col-4">
                        <strong>Forma de Pago: </strong>
                        {orden.tipo_pago}
                    </div>
                    <div className="col-4">
                        <strong>Paciente: </strong>
                        {`${paciente.nombre} ${paciente.nombre_segundo} ${paciente.apellido} ${paciente.apellido_segundo}`}
                    </div>
                    <div className="col-3">
                        <strong>Id: </strong>
                        {paciente.tipo_documento} - {paciente.nro_identificacion}
                    </div>
                    <div className="col-2">
                        <strong>Edad: </strong>
                        {diferencia}
                    </div>
                    <div className="col-3">
                        <strong>Teléfono: </strong>
                        {paciente.telefono}
                    </div>
                    <div className="col-6">
                        <strong>Entidad: </strong>
                        {entidad.nombre}
                    </div>
                    {mi_medico_remitente}
                </div>
            </div>
        )
    }
}