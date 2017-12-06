import {
    FETCH_ESPECIALISTAS,
    FETCH_ESPECIALISTA,
    DELETE_ESPECIALISTA,
    CREATE_ESPECIALISTA,
    UPDATE_ESPECIALISTA
} from './02_types';

import {createRequest} from './00_general_fuctions';

import axios from 'axios';

const axios_instance = axios.create({
    baseURL: '/api/especialistas'
});
const FORMAT = 'format=json';

export function fetchEspecialistas(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALISTAS, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )

    }
}

export function fetchEspecialistasxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/buscar_x_parametro?parametro=${parametro}`;
        const FULL_URL = `${SUB_URL}&${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALISTAS, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function refreshEspecialista(tercero) {
    return {
        type: FETCH_ESPECIALISTA,
        payload: tercero
    }
}

export function deleteEspecialista(id) {
    return {
        type: DELETE_ESPECIALISTA,
        payload: id
    }
}

export function fetchEspecialista(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ESPECIALISTA, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )

    }
}


export function createEspecialista(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const request = axios_instance.post(`/`, values);
        const dispatches = (response) => {
            dispatch({type: CREATE_ESPECIALISTA, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function updateEspecialista(values, callback = null, callback_error = null, config = null) {
    return function (dispatch) {
        const {id} = values;
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        axios_instance.put(`/${id}/`, values, config)
            .then(response => {
                dispatch({type: UPDATE_ESPECIALISTA, payload: response});
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

export function updateEspecialistaFirma(id, values, callback = null, callback_error = null, config = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        axios_instance.put(`/${id}/`, values, config)
            .then(response => {
                dispatch({type: UPDATE_ESPECIALISTA, payload: response});
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