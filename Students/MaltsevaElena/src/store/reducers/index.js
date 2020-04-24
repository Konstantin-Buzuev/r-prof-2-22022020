import { combineReducers } from 'redux'
import chatReducer from './chats_reducer.js'
import userReducer from './users_reducer.js'

import { connectRouter } from 'connected-react-router'

export default history => combineReducers({ 
   router: connectRouter(history),
   userReducer,
   chatReducer 
})