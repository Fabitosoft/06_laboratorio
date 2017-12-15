import axios from 'axios';

const FORMAT = 'format=json';
const asyncValidate = (values, dispatch, props, blurredField) => {
    return new Promise((resolve, reject) => {
        let parametros = ``;
        props.asyncBlurFields.map(
            campo => {
                if (props.initialValues[campo] !== values[campo]) {
                    if (values[campo]) {
                        parametros += `&${campo}=${values[campo]}`
                    }
                }
            }
        );
        const FULL_URL = `/api/pacientes/validar_nuevo_paciente?${parametros}&${FORMAT}`;
        axios.get(FULL_URL)
            .then((request) => {
                resolve(request.data);
            })
            .catch(errors => {
                if (!errors.response) {
                    let errores = {};
                    props.asyncBlurFields.map(campo => {
                        errores[campo] = 'ERROR DE CONEXIÓN'
                    });
                    resolve(errores);
                } else {
                    reject(errors);
                }
            })

    });
};

export default asyncValidate;
