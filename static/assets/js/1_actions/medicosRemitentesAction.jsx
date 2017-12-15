import {
    FETCH_MEDICOS_REMITENTES,
    FETCH_MEDICO_REMITENTE,
    DELETE_MEDICO_REMITENTE,
    CREATE_MEDICO_REMITENTE,
    UPDATE_MEDICO_REMITENTE
} from './02_types';

import axios from 'axios';
import {createRequest} from "./00_general_fuctions";

const axios_instance = axios.create({
    baseURL: '/api/medicos_remitentes'
});

const FORMAT = 'format=json';

export function fetchMedicosRemitentes(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_MEDICOS_REMITENTES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function fetchMedicoRemitentexParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/buscar_nombre?parametro=${parametro}`;
        const FULL_URL = `${SUB_URL}&${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_MEDICOS_REMITENTES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
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
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_MEDICO_REMITENTE, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function crearMedicosRemitente(values, callback) {
    axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios_instance.defaults.xsrfCookieName = "csrftoken";

    const request = axios_instance.post(`/`, values);
    const dispatches = (response) => {
        dispatch({type: CREATE_MEDICO_REMITENTE, payload: response})
    };
    createRequest(
        request,
        dispatches,
        callback,
        callback_error
    )
}

export function updateMedicosRemitente(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const request = axios_instance.put(`/${id}/`, values)
        const dispatches = (response) => {
            dispatch({type: UPDATE_MEDICO_REMITENTE, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}