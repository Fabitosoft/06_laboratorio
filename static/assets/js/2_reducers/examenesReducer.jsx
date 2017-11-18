import {
    FETCH_EXAMENES,
    FETCH_EXAMEN,
    DELETE_EXAMEN
} from '../1_actions/types';

import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_EXAMENES:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_EXAMEN:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_EXAMEN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}