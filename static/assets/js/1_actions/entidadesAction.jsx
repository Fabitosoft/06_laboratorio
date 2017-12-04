import {
    FETCH_ENTIDADES,
    FETCH_ENTIDAD,
    DELETE_ENTIDAD,
    CREATE_ENTIDAD,
    UPDATE_ENTIDAD
} from './02_types';

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

export function fetchEntidadesxParametro(parametro, callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = `entidades/buscar_x_parametro?parametro=${parametro}`;
        const FULL_URL = `${ROOT_URL}${SUB_URL}&${FORMAT}`;
        axios.get(FULL_URL)
            .then(response => {
                dispatch({type: FETCH_ENTIDADES, payload: response});
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

export function refreshEntidad(tercero) {
    return {
        type: FETCH_ENTIDAD,
        payload: tercero
    }
}

export function deleteEntidad(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.delete(`${ROOT_URL}entidades/${id}`)
            .then(response => {
                    dispatch({type: DELETE_ENTIDAD, payload: id});
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                // console.log('error', error);
                // console.log('errorType', typeof error);
                // console.log('error', Object.assign({}, error));
                // console.log('getOwnPropertyNames', Object.getOwnPropertyNames(error));
                // console.log('stackProperty', Object.getOwnPropertyDescriptor(error, 'stack'));
                // console.log('messageProperty', Object.getOwnPropertyDescriptor(error, 'message'));
                // console.log('stackEnumerable', error.propertyIsEnumerable('stack'));
                // console.log('messageEnumerable', error.propertyIsEnumerable('message'));
                callback_error(Object.getOwnPropertyDescriptor(error, 'message'));
            }
        });
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
        });
    }
}


export function crearEntidad(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post(`${ROOT_URL}entidades/`, values)
            .then(response => {
                    dispatch({type: CREATE_ENTIDAD, payload: response});
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                callback_error(error);
            }
        });
    }
}

export function updateEntidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}entidades/${id}/`, values)
            .then(response => {
                    dispatch({type: UPDATE_ENTIDAD, payload: response});
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                callback_error(error);
            }
        });
    }
}

//Contactos Entidades

export function crearContactoEntidad(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post(`${ROOT_URL}contacto_entidades/`, values)
            .then(response => {
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                callback_error(error);
            }
        });
    }
}

export function updateContactoEntidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}contacto_entidades/${id}/`, values)
            .then(response => {
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                callback_error(error);
            }
        });
    }
}

export function deleteContactoEntidad(id, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.delete(`${ROOT_URL}contacto_entidades/${id}`)
            .then(response => {
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                // console.log('error', error);
                // console.log('errorType', typeof error);
                // console.log('error', Object.assign({}, error));
                // console.log('getOwnPropertyNames', Object.getOwnPropertyNames(error));
                // console.log('stackProperty', Object.getOwnPropertyDescriptor(error, 'stack'));
                // console.log('messageProperty', Object.getOwnPropertyDescriptor(error, 'message'));
                // console.log('stackEnumerable', error.propertyIsEnumerable('stack'));
                // console.log('messageEnumerable', error.propertyIsEnumerable('message'));
                callback_error(Object.getOwnPropertyDescriptor(error, 'message'));
            }
        });
    }
}


///Examen Entidad entidad_examenes

export function updateExamenEntidad(id, values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.put(`${ROOT_URL}entidad_examenes/${id}/`, values)
            .then(response => {
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                callback_error(error);
            }
        });
    }
}


export function crearExamenEntidad(values, callback = null, callback_error = null) {
    return function (dispatch) {
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.post(`${ROOT_URL}entidad_examenes/`, values)
            .then(response => {
                    if (callback) {
                        callback(response.data);
                    }
                }
            ).catch(error => {
            if (callback_error) {
                callback_error(error);
            }
        });
    }
}