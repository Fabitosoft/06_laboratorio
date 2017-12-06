import {combineReducers} from 'redux';
import ordenesReducer from '../../2_reducers/ordenesReducer';
import entidadesReducer from '../../2_reducers/entidadesReducer';
import medicosRemitentesReducer from '../../2_reducers/medicosRemitentesReducer';
import pacientesReducer from '../../2_reducers/pacientesReducer';
import especialistasReducer from '../../2_reducers/especialistasReducer';
import especialidadesReducer from '../../2_reducers/especialidadesReducer';
import examenesReducer from '../../2_reducers/examenesReducer';
import examenesOrdenesReducer from '../../2_reducers/ordenesExamenesReducer';
import {reducer as formReducer} from 'redux-form';
import {ciudadesReducer} from '../../2_reducers/utilidadesReducer';
import NotifyReducer from 'react-redux-notify';

const rootReducer = combineReducers({
    ordenes: ordenesReducer,
    examenes: examenesReducer,
    ordenesExamenes: examenesOrdenesReducer,
    entidades: entidadesReducer,
    medicos_remitentes: medicosRemitentesReducer,
    pacientes: pacientesReducer,
    especialistas: especialistasReducer,
    especialidades: especialidadesReducer,
    ciudades: ciudadesReducer,
    notifications: NotifyReducer,
    form: formReducer
});

export default rootReducer;