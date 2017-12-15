import {
    FETCH_MI_CUENTA_ESPECIALISTA
} from '../02_types';

import axios from 'axios';

const axios_instance = axios.create({
    baseURL: '/api/especialistas'
});
import {createRequest} from './../00_general_fuctions';

const FORMAT = 'format=json';

export function fetchMiCuentaEspecialistaInfo(callback = null, callback_error = null) {
    return function (dispatch) {
        const SUB_URL = '/mi_cuenta/';
        const FULL_URL = `${SUB_URL}?${FORMAT}`;
        const request = axios_instance.get(FULL_URL);
        const dispatches = (response) => {
            dispatch({type: FETCH_MI_CUENTA_ESPECIALISTA, payload: response})
        };
        createRequest(
            request,
            dispatches,
            callback,
            callback_error
        );
    }
}