import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import msgReducer from './messages_reducer.js'
import chatsReducer from './chats_reducer.js'

export default (history) => combineReducers({
    router: connectRouter(history),
    chatsReducer,
    msgReducer,
 });