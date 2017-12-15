import {
    FETCH_PACIENTES,
    FETCH_PACIENTE,
    DELETE_PACIENTE,
    CREATE_PACIENTE,
    UPDATE_PACIENTE
} from './02_types';
import axios from 'axios';
import {createRequest} from "./00_general_fuctions";

const axios_instance = axios.create({
    baseURL: '/api/pacientes'
});

const FORMAT = 'format=json';

export function fetchPacientes(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_PACIENTES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function fetchPacientesxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/buscar_x_parametro?parametro=${parametro}`;
        const FULL_URL = `${SUB_URL}&${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_PACIENTES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function refreshPaciente(tercero) {
    return {
        type: FETCH_PACIENTE,
        payload: tercero
    }
}

export function deletePaciente(id) {
    return {
        type: DELETE_PACIENTE,
        payload: id
    }
}

export function fetchPaciente(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_PACIENTE, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}


export function crearPaciente(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.post(`/`, values);
        const dispatches = (response) => {
            dispatch({type: CREATE_PACIENTE, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function updatePaciente(values, callback = null, callback_error = null) {
    return function (dispatch) {
        const {id} = values;
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.put(`/${id}/`, values);
        const dispatches = (response) => {
            dispatch({type: UPDATE_PACIENTE, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}