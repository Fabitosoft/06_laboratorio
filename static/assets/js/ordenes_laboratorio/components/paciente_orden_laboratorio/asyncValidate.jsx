import axios from 'axios';

const FORMAT = 'format=json';
const asyncValidate = (values /*, dispatch */) => {
    return new Promise((resolve, reject) => {
        let parametros = `username=${values.username}&email=${values.email}&nro_documento=${values.nro_documento}&alias=${values.alias}`;
        const FULL_URL = `/api/Terceros/validar_nuevo_usuario?${parametros}&${FORMAT}`;
        axios.get(FULL_URL)
            .then((request) => {
                resolve(request.data);
            })
            .catch(errors => {
                reject(errors);
            })
    });
};

export default asyncValidate;
