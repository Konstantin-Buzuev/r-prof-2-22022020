import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import chatsReducer from './chats_reducer.js';
import msgReducer from './msg_reducer.js';

export default history => combineReducers({
  router: connectRouter(history),
  chatsReducer,
  msgReducer
});
