import {
    CREATE_ORDEN_EXAMEN,
    UPDATE_ORDEN_EXAMEN,
    DELETE_ORDEN_EXAMEN
} from './types';

import axios from 'axios';

const ROOT_URL = '/api/';
const FORMAT = 'format=json';

export function crearOrdenExamen(values, callback = null, callback_error = null) {
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
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}ordenes_exames/${id}/`, values)
            .then(response => {
                dispatch({type: UPDATE_ORDEN_EXAMEN, payload: response});
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