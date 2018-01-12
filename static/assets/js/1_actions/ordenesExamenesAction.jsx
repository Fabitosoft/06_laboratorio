import {
    CREATE_ORDEN_EXAMEN,
    UPDATE_ORDEN_EXAMEN,
    FETCH_ORDENES_EXAMEN,
    FETCH_ORDEN_EXAMEN
} from './02_types';

import axios from 'axios';

import {createRequest} from "./00_general_fuctions";

const axios_instance = axios.create({
    baseURL: '/api/ordenes_exames'
});

const ROOT_URL = '/api/';
const FORMAT = 'format=json';

export function fetchOrdenesExamenes(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function fetchOrdenExamen(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDEN_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}


export function fetchOrdenesExamenesEnProceso(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/en_proceso/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}


export function fetchOrdenesExamenesConResultados(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/con_resultados/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}


export function fetchOrdenesExamenesVerificados(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/verificados/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ORDENES_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function createOrdenExamen(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const request = axios_instance.post(`/`, values);
        const dispatches = (response) => {
            dispatch({type: CREATE_ORDEN_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function firmarOrdenExamen(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const SUB_URL = `/${id}/firmar/`;
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

export function firmarOrdenExamenComo(id, id_especialista, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const SUB_URL = `/${id}/firmar/`;
        const FULL_URL = `${SUB_URL}`;

        var params = new URLSearchParams();
        params.append('id_especialista', id_especialista);

        const request = axios_instance.post(FULL_URL, params);
        createRequest(
            request,
            null,
            callback,
            callback_error
        )
    }
}

export function quitarFirmaOrdenExamen(id, id_firma, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const SUB_URL = `/${id}/quitar_firmar/`;
        const FULL_URL = `${SUB_URL}`;

        var params = new URLSearchParams();
        params.append('id_firma', id_firma);

        const request = axios_instance.post(FULL_URL, params);
        createRequest(
            request,
            null,
            callback,
            callback_error
        )
    }
}


export function updateOrdenExamen(values, callback = null, callback_error = null) {
    return function (dispatch) {
        const {id} = values;
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.put(`/${id}/`, values);
        const dispatches = (response) => {
            dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )


    }
}

export function deleteOrdenExamen(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.delete(`/${id}/`);
        createRequest(
            request,
            null,
            callback,
            callback_error
        )
    }
}