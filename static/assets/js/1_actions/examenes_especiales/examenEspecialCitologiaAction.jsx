import axios from 'axios';
import {createRequest} from "./../00_general_fuctions";

const axios_instance = axios.create({
    baseURL: '/api/examenes_especiales_citologia'
});

const FORMAT = 'format=json';

export function updateCitologia(values, callback = null, callback_error = null) {
    return function (dispatch) {
        const {id} = values;
        axios_instance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios_instance.defaults.xsrfCookieName = "csrftoken";
        const request = axios_instance.put(`/${id}/`, values);
        createRequest(
            request,
            null,
            callback,
            callback_error
        )
    }
}