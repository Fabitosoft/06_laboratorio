import {combineReducers} from 'redux';
import ordenesReducer from '../../2_reducers/ordenesReducer';
import entidadesReducer from '../../2_reducers/entidadesReducer';
import medicosRemitentesReducer from '../../2_reducers/medicosRemitentesReducer';
import pacientesReducer from '../../2_reducers/pacientesReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    ordenes: ordenesReducer,
    entidades: entidadesReducer,
    medicos_remitentes: medicosRemitentesReducer,
    pacientes: pacientesReducer,
    form: formReducer
});

export default rootReducer;