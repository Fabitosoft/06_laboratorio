import React, {Component} from 'react';
import moment from 'moment-timezone';

moment.tz.setDefault("America/Bogota");

export default class ImpresionCabezote extends Component {
    render() {
        const logo = `${img_static_url}/logo.png`;
        const now = moment();
        const fechaImpresion = moment(now, "YYYY MM DD", "es").format("DD MMMM YYYY");
        const horaImpresion = moment(now, "YYYY MM DD", "es").format("hh:mm:ss a");
        return (
            <div className="row impresion">
                <div className="col-2">
                    <img className="img-fluid logo" src={logo} alt=""/>
                </div>
                <div className="col-5">
                    <p className="text-center cabezote">
                        Cra 42 Nro 5B53 (2do PISO)<br/>
                        B. Tequendama - Cali<br/>
                        Tel: 403 11 98 - PBX: 553 27 37 - Cel: 3182032203<br/>
                        mylabcollazos@hotmail.com <br/>
                        NIT: 800.200.522-3
                    </p>
                </div>
                <div className="col-5">
                    Hora Impresión: {horaImpresion}<br/>
                    Fecha Impresión: {fechaImpresion}<br/>
                </div>
            </div>
        )
    }
}