import update from 'immutability-helper';
import {
  ADD_CHAT, BLINK_CHAT, DEL_CHAT, SET_CURRENT_CHAT,
  START_CHATS_LOADING, SUCCESS_CHATS_LOADING, ERROR_CHATS_LOADING,
} from '../actions/chatActions.js';

const initialStore = {
  chats: [],
  chatWithNewMsg: null,
  // currentChatId: null,
  isLoading: false,
};

export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    //-------------------
    case ADD_CHAT:
      let newId = action.chatId;
      if (!newId) break;
      return update(store, {
        chats: { $push: [
          { _id: newId, title: action.title },
        ]},
        currentChatId: { $set: newId },
      });
    //-------------------
    case BLINK_CHAT:
      return update(store, {
        chatWithNewMsg: {$set: action.chatId}
      });
    //-------------------
    case DEL_CHAT:
      if (action.result !== 1) break;
      
      let newCurrentChatId = null;
      for (let i = 0; i < store.chats.length; i++) {
        if (store.chats[i]._id !== action.chatId) {
          newCurrentChatId = store.chats[i]._id
          break;
        }
      }
      const index = store.chats.findIndex(chat => (chat._id === action.chatId));
      
      if (newCurrentChatId) {
        return update(store, {
          chats: { $splice: [[index, 1]] },
          currentChatId: { $set: newCurrentChatId },
        });
      } else {
        return update(store, {
          chats: { $splice: [[index, 1]] },
          currentChatId: { $set: '' },
        });
      }
    //-------------------
    case SET_CURRENT_CHAT:
      return update(store, {
        currentChatId: {$set: action.chatId}
      });
    //-------------------
    case START_CHATS_LOADING:
      return update(store, {
        isLoading: { $set: true }
      });
    //-------------------
    case SUCCESS_CHATS_LOADING:
      const currentChatId = action.payload.length ? action.payload[0]._id : null;
      if (currentChatId) {
        return update(store, {
          chats: { $set: action.payload },
          currentChatId: {$set: currentChatId},
          isLoading: { $set: false }
        });
      } else {
        return update(store, {
          chats: { $set: action.payload },
          isLoading: { $set: false }
        });
      }
    //-------------------
    case ERROR_CHATS_LOADING:
      return update(store, {
        isLoading: { $set: false }
      });
    //-------------------
    default:
      return store;
  }
}
