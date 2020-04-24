import initialRedusers from './reducers' // import Mega Reducer
import { createStore } from 'redux'

export default function initStore() {
    let initialStore = {}

    return createStore(initialRedusers, initialStore)
}