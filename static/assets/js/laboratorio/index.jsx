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

import PacientesLista from './01_usuarios/containers/pacientes/paciente_lista';
import PacientesCrear from './01_usuarios/containers/pacientes/paciente_crear';
import PacientesEditar from './01_usuarios/containers/pacientes/paciente_editar';

import EspecialistasCrear from './01_usuarios/containers/especialistas/especialista_crear';
import EspecialistasLista from './01_usuarios/containers/especialistas/especialista_lista';
import EspecialistasEditar from './01_usuarios/containers/especialistas/especialista_editar';

import OrdenLaboratorioCrear from './02_ordenes_laboratorio/containers/orden_crear';
import OrdenLaboratorioEditar from './02_ordenes_laboratorio/containers/orden_detail';
import OrdenLaboratorioLista from './02_ordenes_laboratorio/containers/orden_lista';


import OrdenExamenDetail from './04_examenes/containers/orden_examen/orden_examen_detail';

import ExamenesEnProceso from './04_examenes/containers/orden_examen/en_proceso/examenes_en_proceso_lista';
import ExamenesConResultados from './04_examenes/containers/orden_examen/con_resultados/examenes_con_resultados_lista';
import ExamenesVerificados from './04_examenes/containers/orden_examen/verificados/examenes_verificados_lista';


import EntidadesLista from './03_entidades/containers/entidad_lista';
import EntidadesCrear from './03_entidades/containers/entidad_crear';
import EntidadesEditar from './03_entidades/containers/entidad_editar';

import ContactoEntidadCrear from './03_entidades/containers/mis_contactos/crear_contacto_entidad';

import ExamenEntidadCrear from './03_entidades/containers/mis_examenes/crear_examen_entidad';

import ExamenesPorResultadoLista from './containers/examenes_ordenes/examenes_ordenes_lista'

import Menu from './components/menu/menu';

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
                        <Route path='/app/ordenes_laboratorio/detail/:id' component={OrdenLaboratorioEditar}/>


                        <Route path='/app/paciente/lista/' component={PacientesLista}/>
                        <Route path='/app/paciente/crear/' component={PacientesCrear}/>
                        <Route path='/app/paciente/editar/:id' component={PacientesEditar}/>

                        <Route path='/app/especialista/lista/' component={EspecialistasLista}/>
                        <Route path='/app/especialista/crear/' component={EspecialistasCrear}/>
                        <Route path='/app/especialista/editar/:id' component={EspecialistasEditar}/>


                        <Route path='/app/orden_examen/editar/:id' component={OrdenExamenDetail}/>


                        <Route path='/app/examenes/en_proceso/lista/' component={ExamenesEnProceso}/>
                        <Route path='/app/examenes/con_resultados/lista/' component={ExamenesConResultados}/>
                        <Route path='/app/examenes/verificados/lista/' component={ExamenesVerificados}/>


                        <Route path='/app/examenes_ordenes/por_resultados/' component={ExamenesPorResultadoLista}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.querySelector('.cosa')
);