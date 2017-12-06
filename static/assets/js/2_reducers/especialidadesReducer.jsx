import {
    FETCH_ESPECIALIDADES,
    FETCH_ESPECIALIDAD,
    DELETE_ESPECIALIDAD
} from '../1_actions/02_types';

import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ESPECIALIDADES:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_ESPECIALIDAD:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_ESPECIALIDAD:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}