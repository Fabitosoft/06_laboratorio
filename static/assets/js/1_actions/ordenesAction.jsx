import {
    FETCH_ORDENES,
    FETCH_ORDEN,
    DELETE_ORDEN,
    CREATE_ORDEN,
    UPDATE_ORDEN
} from './02_types';
import axios from 'axios';
import {createRequest} from "./00_general_fuctions";

const axios_instance = axios.create({
    baseURL: '/api/ordenes'
});

const FORMAT = 'format=json';

export function fetchOrdenes(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function fetchOrdenesxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/buscar_x_parametro?parametro=${parametro}`;
        const FULL_URL = `${SUB_URL}&${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function refreshOrden(tercero) {
    return {
        type: FETCH_ORDEN,
        payload: tercero
    }
}

export function fetchOrden(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}


export function crearOrden(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.post(`/`, values);
        const dispatches = (response) => {
            dispatch({type: CREATE_ORDEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function updateOrden(values, callback = null, callback_error = null) {
    return function (dispatch) {
        const {id} = values;
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.put(`/${id}/`, values);
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function deleteOrden(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const request = axios_instance.delete(`/${id}/`);
        const dispatches = (response) => {
            dispatch({type: DELETE_ORDEN, payload: {id}})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function enviar_email(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const SUB_URL = `/${id}/enviar_email/`;
        const FULL_URL = `${SUB_URL}`;
        const request = axios_instance.post(FULL_URL);
        createRequest(
            request,
            null,
            callback,
            callback_error
        )
    }
}