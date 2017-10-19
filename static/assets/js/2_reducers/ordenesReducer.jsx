import {
    FETCH_ORDENES,
    FETCH_ORDEN,
    DELETE_ORDEN
} from '../1_actions/types';

import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ORDENES:
            console.log(action.payload.data);
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_ORDEN:
            console.log('entro a fetch tercero en reducer');
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_ORDEN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}