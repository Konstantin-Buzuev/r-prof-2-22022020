import update from 'immutability-helper';
import {
  SEND_MESSAGE, DEL_MESSAGE, SET_SEARCH_TEXT,
  START_MESSAGES_LOADING, SUCCESS_MESSAGES_LOADING, ERROR_MESSAGES_LOADING,
} from '../actions/messageActions.js';

const initialStore = {
  msgs: [],
  isLoading: false,
  searchText: '',
};

export default function messageReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      if (!action.msgId) break;
      return update(store, {
        msgs: {
          $push: [{
            _id: action.msgId, sender: action.sender, text: action.text, chatId: action.chatId
          }]
        }
      });

    case DEL_MESSAGE:
      if (action.result !== 1) break;
      const index = store.msgs.findIndex( msg => (msg._id === action.msgId) );
      return update(store, {
        msgs: { $splice: [[index, 1]] }
      });
    
    case SET_SEARCH_TEXT:
      return update(store, {
        searchText: { $set: [action.str] }
      });
    
    case START_MESSAGES_LOADING:
      return update(store, {
        isLoading: { $set: true }
      });
    
    case SUCCESS_MESSAGES_LOADING:
      return update(store, {
        msgs: { $set: action.payload },
        isLoading: { $set: false }
      });
    
    case ERROR_MESSAGES_LOADING:
      return update(store, {
        isLoading: { $set: false }
      });
  
    default:
      return store;
  }
}