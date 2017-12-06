import {
    FETCH_CIUDADES
} from '../1_actions/02_types';

import _ from 'lodash';

export function ciudadesReducer(state = [], action) {
    switch (action.type) {
        case FETCH_CIUDADES:
            console.log(action.payload.data)
            return action.payload.data
        default:
            return state;
    }
}