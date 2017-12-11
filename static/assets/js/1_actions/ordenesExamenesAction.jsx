import {
    CREATE_ORDEN_EXAMEN,
    UPDATE_ORDEN_EXAMEN,
    DELETE_ORDEN_EXAMEN,
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
        const SUB_URL = 'ordenes_exames/';
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_ORDENES_EXAMEN, payload: response});
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

export function createOrdenExamen(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post(`${ROOT_URL}ordenes_exames/`, values)
            .then(response => {
                dispatch({type: CREATE_ORDEN_EXAMEN, payload: response});
                if (callback) {
                    callback(response.data)
                }
            }).catch(error => {
            if (callback_error) {
                callback_error(error)
            }
        });
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
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.delete(`${ROOT_URL}ordenes_exames/${id}/`)
            .then(response => {
                dispatch({type: DELETE_ORDEN_EXAMEN, payload: response});
                if (callback) {
                    callback(response.data)
                }
            }).catch(error => {
            if (callback_error) {
                callback_error(error)
            }
        });
    }
}