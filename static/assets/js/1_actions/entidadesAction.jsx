import {
    FETCH_ENTIDADES,
    FETCH_ENTIDAD,
    DELETE_ENTIDAD,
    CREATE_ENTIDAD,
    UPDATE_ENTIDAD
} from './types';

import axios from 'axios';

const ROOT_URL = '/api/';
const FORMAT = 'format=json';

export function fetchEntidades(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = 'entidades/';
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_ENTIDADES, payload: response});
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

export function refreshEntidad(tercero) {
    return {
        type: FETCH_ENTIDAD,
        payload: tercero
    }
}

export function deleteEntidad(id) {
    return {
        type: DELETE_ENTIDAD,
        payload: id
    }
}

export function fetchEntidad(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `entidades/${id}/`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_ENTIDAD, payload: response});
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
                if (callback_error) {
                    callback_error(error);
                }
            }
        )
    }
}


export function crearEntidad(values, callback = null, callback_error = null) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios.post(`${ROOT_URL}entidades/`, values).then(() => callback()).catch(error => {
        console.log(error)
    });
    return {
        type: CREATE_ENTIDAD,
        payload: request
    };
}

export function updateEntidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}entidades/${id}/`, values)
            .then(
                () => callback()
            )
            .catch(error => {
                dispatch({type: UPDATE_ENTIDAD, payload: request});
            });
    }
}