import axios from 'axios';

const FORMAT = 'format=json';
const asyncValidate = (values, dispatch, props, blurredField) => {
    return new Promise((resolve, reject) => {
        let parametros = ``;
        props.asyncBlurFields.map(
            campo => {
                if (values[campo]) {
                    parametros += `&${campo}=${values[campo]}`
                }
            }
        );
        const FULL_URL = `/api/pacientes/validar_nuevo_paciente?${parametros}&${FORMAT}`;
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
