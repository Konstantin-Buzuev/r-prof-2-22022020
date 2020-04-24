import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';
// import { Grid, Container } from '@material-ui/core';

import './index.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import 'typeface-roboto'

import Layout from './components/Layout/Layout.jsx'

// import Messages from './components/MessagesField/MessagesField.jsx'
// import Chats from './components/ChatList/ChatList.jsx'

//store
import { Provider } from 'react-redux'
import initStore from './store/store.js'
// import { Router } from '@material-ui/icons';

import Router from './router/router.jsx'
import { BrowserRouter } from 'react-router-dom'

import { ConnectedRouter } from 'connected-react-router'
import { history } from './store/store.js'

import { PersistGate } from 'redux-persist/integration/react';

// let user = 'Darth Vader'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#00695f',
            main: '#009688',
            dark: '#33ab9f',
        },
        secondary: {
          main: '#ffe082',
        },
        background: {
            paper: '#00695f',
            default: "#fff"
         }
      },
})

const { store, persistor } = initStore();

ReactDom.render (
   <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistor } >
         <ConnectedRouter history={ history }>
            <ThemeProvider theme={theme}>
               <Router />
            </ThemeProvider>
         </ConnectedRouter>
      </PersistGate>
   </Provider>
   , document.getElementById('app')
)