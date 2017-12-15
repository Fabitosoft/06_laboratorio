import {
    FETCH_ESPECIALIDADES,
    FETCH_ESPECIALIDAD,
    DELETE_ESPECIALIDAD,
    CREATE_ESPECIALIDAD,
    UPDATE_ESPECIALIDAD, FETCH_ESPECIALISTAS, FETCH_ESPECIALISTA, CREATE_ESPECIALISTA, UPDATE_ESPECIALISTA
} from './02_types';

import axios from 'axios';

const FORMAT = 'format=json';
import {createRequest} from "./00_general_fuctions";

const axios_instance = axios.create({
    baseURL: '/api/especialidades'
});

export function fetchEspecialidades(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALIDADES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function fetchEspecialidadxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/buscar_nombre?parametro=${parametro}`;
        const FULL_URL = `${SUB_URL}&${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALIDADES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function refreshEspecialidad(tercero) {
    return {
        type: FETCH_ESPECIALIDAD,
        payload: tercero
    }
}

export function deleteEspecialidad(id) {
    return {
        type: DELETE_ESPECIALIDAD,
        payload: id
    }
}

export function fetchEspecialidad(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALIDAD, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}


export function createEspecialidad(values, callback = null, callback_error = null) {
    axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios_instance.defaults.xsrfCookieName = "csrftoken";

    const request = axios_instance.post(`/`, values);
    const dispatches = (response) => {
        dispatch({type: CREATE_ESPECIALIDAD, payload: response})
    };
    createRequest(
        request,
        dispatches,
        callback,
        callback_error
    )

}

export function updateEspecialidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const request = axios_instance.put(`/${id}/`, values)
        const dispatches = (response) => {
            dispatch({type: UPDATE_ESPECIALIDAD, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}