import {
    FETCH_ENTIDADES,
    FETCH_ENTIDAD,
    DELETE_ENTIDAD,
    UPDATE_ENTIDAD
} from '../1_actions/02_types';

import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ENTIDADES:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
        case UPDATE_ENTIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_ENTIDAD:
            return _.omit(state, action.payload.id);
        default:
            return state;
    }
}