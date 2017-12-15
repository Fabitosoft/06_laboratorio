import {
    FETCH_ENTIDADES,
    FETCH_ENTIDAD,
    DELETE_ENTIDAD,
    CREATE_ENTIDAD,
    UPDATE_ENTIDAD,
} from './02_types';

import axios from 'axios';
import {createRequest} from "./00_general_fuctions";

const axios_instance = axios.create({
    baseURL: '/api/entidades'
});
const axios_instance_contacto_entidades = axios.create({
    baseURL: '/api/contacto_entidades'
});

const axios_instance_examenes_entidades = axios.create({
    baseURL: '/api/entidad_examenes'
});

const FORMAT = 'format=json';

export function fetchEntidades(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDADES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function fetchEntidadesxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/buscar_x_parametro?parametro=${parametro}`;
        const FULL_URL = `${SUB_URL}&${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDADES, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function refreshEntidad(tercero) {
    return {
        type: FETCH_ENTIDAD,
        payload: tercero
    }
}

export function deleteEntidad(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";

        const request = axios_instance.delete(`/${id}/`);
        const dispatches = (response) => {
            dispatch({type: DELETE_ENTIDAD, payload: {id}})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function fetchEntidad(id, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `/${id}/`;
        const FULL_URL = `${SUB_URL}?${FORMAT}`;

        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_ENTIDAD, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}


export function crearEntidad(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.post(`/`, values);
        const dispatches = (response) => {
            dispatch({type: CREATE_ENTIDAD, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

export function updateEntidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.put(`/${id}/`, values)
        const dispatches = (response) => {
            dispatch({type: UPDATE_ENTIDAD, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        )
    }
}

//Contactos Entidades

export function crearContactoEntidad(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance_contacto_entidades.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance_contacto_entidades.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance_contacto_entidades.post(`/`, values);
        createRequest(
            request,
            () => {
            },
            callback,
            callback_error
        )
    }
}

export function updateContactoEntidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance_contacto_entidades.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance_contacto_entidades.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance_contacto_entidades.put(`/${id}/`, values);
        createRequest(
            request,
            () => {
            },
            callback,
            callback_error
        )
    }
}

export function deleteContactoEntidad(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance_contacto_entidades.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance_contacto_entidades.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance_contacto_entidades.delete(`/${id}/`);
        createRequest(
            request,
            () => {
            },
            callback,
            callback_error
        )
    }
}


///Examen Entidad entidad_examenes

export function updateExamenEntidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance_examenes_entidades.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance_examenes_entidades.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance_examenes_entidades.put(`/${id}/`, values);
        createRequest(
            request,
            () => {
            },
            callback,
            callback_error
        )
    }
}


export function crearExamenEntidad(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios_instance_examenes_entidades.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance_examenes_entidades.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance_examenes_entidades.post(`/`, values);
        createRequest(
            request,
            () => {
            },
            callback,
            callback_error
        )
    }
}