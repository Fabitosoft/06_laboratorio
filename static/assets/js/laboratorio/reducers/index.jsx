import {combineReducers} from 'redux';
import ordenesReducer from '../../2_reducers/ordenesReducer';
import entidadesReducer from '../../2_reducers/entidadesReducer';
import medicosRemitentesReducer from '../../2_reducers/medicosRemitentesReducer';
import pacientesReducer from '../../2_reducers/pacientesReducer';
import examenesReducer from '../../2_reducers/examenesReducer';
import {reducer as formReducer} from 'redux-form';
import NotifyReducer from 'react-redux-notify';

const rootReducer = combineReducers({
    ordenes: ordenesReducer,
    examenes: examenesReducer,
    entidades: entidadesReducer,
    medicos_remitentes: medicosRemitentesReducer,
    pacientes: pacientesReducer,
    notifications: NotifyReducer,
    form: formReducer
});

export default rootReducer;