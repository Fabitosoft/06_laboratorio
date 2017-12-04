import {
    FETCH_PACIENTES,
    FETCH_PACIENTE,
    DELETE_PACIENTE
} from '../1_actions/02_types';

import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_PACIENTES:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_PACIENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_PACIENTE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}