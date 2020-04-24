import { combineReducers } from 'redux'
import  msgReducer from './messages_reducer.js'
import  chatReducer from './chats_reducer.js'

export default combineReducers({ msgReducer, chatReducer })