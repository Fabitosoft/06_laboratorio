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

export function fetchPacientes() {
    return function (dispatch) {
        const SUB_URL = 'pacientes/';
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                    dispatch({type: FETCH_PACIENTES, payload: response})
                }
            ).catch(function (error) {

        })
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

export function fetchPaciente(id) {
    return function (dispatch) {
        const SUB_URL = `pacientes/${id}/`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}?${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {

                    dispatch({type: FETCH_PACIENTE, payload: response})
                }
            ).catch(function (error) {

        })
    }
}


export function crearPaciente(values, callback) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios.post(`${ROOT_URL}pacientes/`, values).then(() => callback()).catch(error => {
        console.log(error)
    });
    return {
        type: CREATE_PACIENTE,
        payload: request
    };
}

export function updatePaciente(id, values, callback) {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const request = axios.put(`${ROOT_URL}pacientes/${id}/`, values).then(() => callback()).catch(error => {
        console.log(error)
    });
    return {
        type: UPDATE_PACIENTE,
        payload: request
    };
}