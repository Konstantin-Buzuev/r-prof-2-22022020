//TODO Не сохранять searchText - см. nested persists

import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

// redux-persist
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import initReducers from './reducers/index.js';
import middlewares from '../middlewares/index.js';

const persistConfig = {
  key: 'Geek_React_by_rri9',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['profileReducer'],
};

export const history = createBrowserHistory();

function initStore() {
  const initialStore = {};

  const store = createStore(
    persistReducer(persistConfig, initReducers(history)),
    initialStore,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        ...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );

  const persistor = persistStore(store);

  return {store, persistor};
}

export default initStore;