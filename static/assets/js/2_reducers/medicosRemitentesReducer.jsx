import {
    FETCH_MEDICOS_REMITENTES,
    FETCH_MEDICO_REMITENTE,
    DELETE_MEDICO_REMITENTE
} from '../1_actions/types';

import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_MEDICOS_REMITENTES:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_MEDICO_REMITENTE:
            return {...state, [action.payload.data.id]: action.payload.data};
        case DELETE_MEDICO_REMITENTE:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}