import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import initStore, { history } from './store/store.js';
import Router from './router/router.jsx';
import { PersistGate } from 'redux-persist/integration/react';
//import { BrowserRouter } from 'react-router-dom'

//let InitStore = initStore()
const { store, persistor } = initStore();


  ReactDom.render (
        <Provider store = { store }>
          <PersistGate loading={ null } persistor={ persistor }>
          <ConnectedRouter history={history}>
            <Router />
          </ConnectedRouter>
          </PersistGate>
        </Provider>
    , document.getElementById('app')
);

