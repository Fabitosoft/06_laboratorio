import {
    FETCH_MI_CUENTA_ESPECIALISTA
} from '../../1_actions/02_types';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_MI_CUENTA_ESPECIALISTA:
            return action.payload.data[0];
            break;
        default:
            return state;
    }
}