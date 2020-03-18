import initialReducers from './reducers';
import { createStore, compose, applyMiddleware } from 'redux';

import middlewares from '../middlewares/index.js';

import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer, persistStore } from 'redux-persist'

const persisitConfig = {
    key: 'ReactGramm',
    storage,
    stateReconciler: autoMergeLevel2,
    whiteList: ['msgReducer', 'chatsReducer']
}

export const history = createHashHistory({
    hashType: 'slash'
});

function initStore() {
    let initialStore = {};
    const store =  createStore(
        persistReducer(persisitConfig, initialReducers(history)), 
        initialStore,
        compose(
            applyMiddleware(routerMiddleware(history), ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {},
        )
    );
    const persistor = persistStore(store);
    return { store, persistor };
}

export default initStore;