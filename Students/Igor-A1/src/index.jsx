import React from 'react';
import ReactDom from 'react-dom';

import Router from './router/router.jsx';
import { ConnectedRouter } from 'connected-react-router';
//import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import initStore, { history } from './store/store.js';

const store = initStore();

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, blue, cyan } from '@material-ui/core/colors';

import Layout from './components/Layout/Layout.jsx';

import './style.css';

const theme = createMuiTheme({
  themeName: 'Simple Theme',
  palette: {
    primary: indigo,
    hovered: blue["400"],
    selected: indigo,
    secondary: cyan,
    background: {
       paper: indigo['50'],
       default: indigo['A100']
    }
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'Helvetica', 'sans-serif'].join(','),
    fontWeight: 400,
    fontSize: 14,
  },
  spacing: 2
});

ReactDom.render (
  <Provider store={ store }>
      <ConnectedRouter history={ history } >
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </ConnectedRouter>
  </Provider>
  , document.getElementById('app')
);
