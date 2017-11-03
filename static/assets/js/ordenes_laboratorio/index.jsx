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

import NuevaOrdenLaboratorio from './containers/nueva_orden_laboratorio';
import OrdenLaboratorioDetail from './containers/orden_laboratorio_detail';
import App from './containers/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(createStore);


const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    < Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path='/ordenes/nueva/' component={NuevaOrdenLaboratorio}/>
                        <Route path='/ordenes/:id/' component={OrdenLaboratorioDetail}/>
                        <Route path='/ordenes/' component={App}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>
    , document.querySelector('.cosa')
);