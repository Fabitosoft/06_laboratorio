import {
    FETCH_ENTIDADES,
    FETCH_ENTIDAD,
    DELETE_ENTIDAD
} from '../1_actions/types';

import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ENTIDADES:
            console.log(action.payload.data);
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_ENTIDAD:
            console.log('entro a fetch tercero en reducer');
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_ENTIDAD:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}