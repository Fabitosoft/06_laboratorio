import {
    FETCH_PACIENTES,
    FETCH_PACIENTE,
    DELETE_PACIENTE,
    CREATE_PACIENTE,
    UPDATE_PACIENTE
} from './types';

import axios from 'axios';

const ROOT_URL = '/api/';
const FORMAT = 'format=json';

export function fetchPacientes(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = 'pacientes/';
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                dispatch({type: FETCH_PACIENTES, payload: response});
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

export function fetchPacientesxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `pacientes/buscar_nombre?parametro=${parametro}`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}&${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                dispatch({type: FETCH_PACIENTES, payload: response});
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
        const SUB_URL = `pacientes/${id}/`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                dispatch({type: FETCH_PACIENTE, payload: response});
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


export function crearPaciente(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post(`${ROOT_URL}pacientes/`, values)
            .then(response => {
                dispatch({type: CREATE_PACIENTE, payload: response});
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

export function updatePaciente(values, callback = null, callback_error = null) {
    return function (dispatch) {
        const {id} = values;
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}pacientes/${id}/`, values)
            .then(response => {
                dispatch({type: UPDATE_PACIENTE, payload: response});
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