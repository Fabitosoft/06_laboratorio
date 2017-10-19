import {combineReducers} from 'redux';
import ordenesReducer from '../../2_reducers/ordenesReducer';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    ordenes: ordenesReducer,
    form: formReducer
});

export default rootReducer;