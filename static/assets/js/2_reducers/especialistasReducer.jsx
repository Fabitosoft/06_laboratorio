import {
    FETCH_ESPECIALISTAS,
    FETCH_ESPECIALISTA,
    DELETE_ESPECIALISTA
} from '../1_actions/02_types';

import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_ESPECIALISTAS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_ESPECIALISTA:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_ESPECIALISTA:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}