import {createRequest} from './00_general_fuctions';
import axios from 'axios';
import {FETCH_CIUDADES} from "./02_types";


var instance = axios.create({
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
//
//
// export function prueba(callback = null, callback_error = null) {
//     return function (dispatch) {
//         const FULL_URL = 'users/';
//         instance.get(FULL_URL)
//             .then(response => {
//                 if (callback) {
//                     callback(response.data)
//                 }
//             }).catch(error => {
//             if (callback_error) {
//                 callback_error(error)
//             }
//         });
//     }
// }
//FETCH_CIUDADES

export function buscarCiudad(ciudad_nombre = null, callback = null, callback_error = null) {
    return function (dispatch) {
        const FULL_URL = `http://gd.geobytes.com/AutoCompleteCity?callback=&q=${ciudad_nombre}`;
        const dispatches = (response) => {
            dispatch({type: FETCH_CIUDADES, payload: response})
        };
        createRequest(axios.get(FULL_URL), dispatches)
    }
}