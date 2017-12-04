import {
    FETCH_ORDENES_EXAMEN
} from '../1_actions/02_types';

import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_ORDENES_EXAMEN:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}