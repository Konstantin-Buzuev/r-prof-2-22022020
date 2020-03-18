import initialReducers from './reducers';
import {
    compose,
    applyMiddleware
} from 'redux'
import {
    createStore
} from 'redux';
import {
    createBrowserHistory
} from 'history';
import {
    routerMiddleware
} from 'connected-react-router';
import middlewares from '../middlewares/index.js'


export const history = createBrowserHistory()



function initStore() {
    const initialStore = {};
    const store = createStore(
        initialReducers(history),
        initialStore,
        compose(applyMiddleware(routerMiddleware(history), ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : () => {}))
    return store;

}

export default initStore