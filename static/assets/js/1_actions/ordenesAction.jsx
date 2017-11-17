import {
    FETCH_ORDENES,
    FETCH_ORDEN,
    DELETE_ORDEN,
    CREATE_ORDEN,
    UPDATE_ORDEN
} from './types';

import axios from 'axios';

const ROOT_URL = '/api/';
const FORMAT = 'format=json';

export function fetchOrdenes(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = 'ordenes/';
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                dispatch({type: FETCH_ORDENES, payload: response});
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

export function fetchOrdenesxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `ordenes/buscar_x_parametro?parametro=${parametro}`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}&${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                dispatch({type: FETCH_ORDENES, payload: response});
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

export function refreshOrden(tercero) {
    return {
        type: FETCH_ORDEN,
        payload: tercero
    }
}

export function deleteOrden(id) {
    return {
        type: DELETE_ORDEN,
        payload: id
    }
}

export function fetchOrden(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `ordenes/${id}/`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                dispatch({type: FETCH_ORDEN, payload: response})
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


export function crearOrden(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post(`${ROOT_URL}ordenes/`, values)
            .then(response => {
                dispatch({type: CREATE_ORDEN, payload: response});
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

export function updateOrden(values, callback = null, callback_error = null) {
    return function (dispatch) {
        const {id} = values;
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}ordenes/${id}/`, values)
            .then(response => {
                dispatch({type: UPDATE_ORDEN, payload: response});
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