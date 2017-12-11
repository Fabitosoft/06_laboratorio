import {
    FETCH_EXAMENES,
    FETCH_EXAMEN,
    DELETE_EXAMEN,
    CREATE_EXAMEN,
    UPDATE_EXAMEN
} from './02_types';

import {createRequest} from "./00_general_fuctions";

import axios from 'axios';

const axios_instance = axios.create({
    baseURL: '/api/examenes'
});
const FORMAT = 'format=json';

export function fetchExamenes(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_EXAMENES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        );
    }
}

export function fetchExamenesxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/buscar_x_parametro?parametro=${parametro}`;
        const FULL_URL = `${SUB_URL}&${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_EXAMENES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        );
    }
}

export function refreshExamen(examen) {
    return {
        type: FETCH_EXAMEN,
        payload: examen
    }
}

export function deleteExamen(id) {
    return {
        type: DELETE_EXAMEN,
        payload: id
    }
}

export function fetchExamen(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        );
    }
}


export function crearExamen(values, callback = null, callback_error = null) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios_instance.post(`/`, values);
    const dispatches = (response) => {
        dispatch({type: CREATE_EXAMEN, payload: response})
    };
    createRequest(
        request,
        dispatches,
        callback,
        callback_error
    );
}

export function updateExamen(id, values, callback = null, callback_error = null) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios_instance.put(`/`, values);
    const dispatches = (response) => {
        dispatch({type: UPDATE_EXAMEN, payload: response})
    };
    createRequest(
        request,
        dispatches,
        callback,
        callback_error
    );
}