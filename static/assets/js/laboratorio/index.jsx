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
import {Notify} from 'react-redux-notify';

import App from './containers/app';

import PacienteCrearActualizar from './containers/pacientes/crearActualizar';
import OrdenLaboratorioCrear from './containers/ordenes/crearActualizar';
import OrdenLaboratorioLista from './containers/ordenes/lista';


import EntidadesLista from './containers/entidades/entidad_lista';
import EntidadesCrear from './containers/entidades/entidad_crear';
import EntidadesEditar from './containers/entidades/entidad_editar';
import ContactoEntidadCrear from './containers/entidades/mis_contactos/crear_contacto_entidad';
import ExamenEntidadCrear from './containers/entidades/mis_examenes/crear_examen_entidad';

import Menu from './components/menu';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);


const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    < Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <BrowserRouter>
                <div className='p-2 m-2'>
                    <Notify/>
                    <div id="react-no-print">
                        <Menu/>
                    </div>
                    <Switch>
                        <Route path='/app/entidades/lista/' component={EntidadesLista}/>
                        <Route path='/app/entidades/crear/' component={EntidadesCrear}/>
                        <Route path='/app/entidades/editar/:id' component={EntidadesEditar}/>
                        <Route path='/app/entidades/contacto/crear/:id_entidad' component={ContactoEntidadCrear}/>
                        <Route path='/app/entidades/examen/crear/:id_entidad' component={ExamenEntidadCrear}/>

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