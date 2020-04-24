import { createStore, compose, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import middlewares from '../middlewares/index.js'
import initReducers from './reducers'

const persistConfig = {
   key: 'reactgram',
   storage,
   stateReconciler: autoMergeLevel2,
   whitelist: ['chatReducer', 'userReducer']
}

export const history = createBrowserHistory()

function initStore() {
   let initialStore = {}

   const store = createStore(
      persistReducer(persistConfig, initReducers(history)), 
      initialStore,
      compose(
         applyMiddleware(routerMiddleware(history), ...middlewares),
         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
      )
   )

   const persistor = persistStore(store)

   return { store, persistor }
}

export default initStore