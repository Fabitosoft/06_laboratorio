import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import reducers from './reducers';

import App from './containers/app';

import PacienteCrearActualizar from './containers/pacientes/crearActualizar';
import OrdenLaboratorioCrear from './containers/ordenes/crearActualizar';
import OrdenLaboratorioLista from './containers/ordenes/lista';

import Menu from './components/menu';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);


const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    < Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <BrowserRouter>
                <div className='p-2 m-2'>
                    <div id="react-no-print">
                        <Menu/>
                    </div>
                    <Switch>
                        <Route path='/app/ordenes_laboratorio/crear/' component={OrdenLaboratorioCrear}/>
                        <Route path='/app/ordenes_laboratorio/lista/' component={OrdenLaboratorioLista}/>
                        <Route path='/app/ordenes_laboratorio/detail/:id' component={OrdenLaboratorioCrear}/>
                        <Route path='/app/paciente/crear/' component={PacienteCrearActualizar}/>
                        <Route path='/app/paciente/modificar/' component={App}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.querySelector('.cosa')
);