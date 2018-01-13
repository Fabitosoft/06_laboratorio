import {
    FETCH_MIS_PERMISOS
} from '../../1_actions/02_types';

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_MIS_PERMISOS:
            return _.map(action.payload.data, permiso => {
                return permiso.codename
            });
            break;
        default:
            return state;
    }
}