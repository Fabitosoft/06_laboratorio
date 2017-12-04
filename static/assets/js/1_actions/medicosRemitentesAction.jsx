import {
    FETCH_MEDICOS_REMITENTES,
    FETCH_MEDICO_REMITENTE,
    DELETE_MEDICO_REMITENTE,
    CREATE_MEDICO_REMITENTE,
    UPDATE_MEDICO_REMITENTE
} from './02_types';

import axios from 'axios';

const ROOT_URL = '/api/';
const FORMAT = 'format=json';

export function fetchMedicosRemitentes() {
    return function (dispatch) {
        const SUB_URL = 'medicos_remitentes/';
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_MEDICOS_REMITENTES, payload: response})
                }
            ).catch(function (error) {

        })
    }
}

export function fetchMedicoRemitentexParametro(parametro) {
    return function (dispatch) {
        const SUB_URL = `medicos_remitentes/buscar_nombre?parametro=${parametro}`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}&${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_MEDICOS_REMITENTES, payload: response})
                }
            ).catch(function (error) {

        })
    }
}

export function refreshMedicosRemitente(tercero) {
    return {
        type: FETCH_MEDICO_REMITENTE,
        payload: tercero
    }
}

export function deleteMedicosRemitente(id) {
    return {
        type: DELETE_MEDICO_REMITENTE,
        payload: id
    }
}

export function fetchMedicosRemitente(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `medicos_remitentes/${id}/`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_MEDICO_REMITENTE, payload: response})
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
                if (callback_error) {
                    callback_error(error);
                }
            }
        );
    }
}


export function crearMedicosRemitente(values, callback) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios.post(`${ROOT_URL}medicos_remitentes/`, values).then(() => callback()).catch(error => {
        console.log(error)
    });
    return {
        type: CREATE_MEDICO_REMITENTE,
        payload: request
    };
}

export function updateMedicosRemitente(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}medicos_remitentes/${id}/`, values)
            .then(response => {
                    dispatch({type: UPDATE_MEDICO_REMITENTE, payload: response});
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
                if (callback_error) {
                    callback_error(error);
                }
            }
        );
    }
}