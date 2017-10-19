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

export function fetchOrdenes() {
    return function (dispatch) {
        const SUB_URL = 'ordenes/';
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_ORDENES, payload: response})
                }
            ).catch(function (error) {

        })
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

export function fetchOrden(id) {
    return function (dispatch) {
        const SUB_URL = `ordenes/${id}/`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {

                    dispatch({type: FETCH_ORDEN, payload: response})
                }
            ).catch(function (error) {

        })
    }
}


export function crearOrden(values, callback) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios.post(`${ROOT_URL}ordenes/`, values).then(() => callback()).catch(error => {
        console.log(error)
    });
    return {
        type: CREATE_ORDEN,
        payload: request
    };
}

export function updateOrden(id, values, callback) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios.put(`${ROOT_URL}ordenes/${id}/`, values).then(() => callback()).catch(error => {
        console.log(error)
    });
    return {
        type: UPDATE_ORDEN,
        payload: request
    };
}