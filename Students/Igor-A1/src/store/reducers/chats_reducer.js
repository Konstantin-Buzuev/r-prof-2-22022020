import update from 'react-addons-update';

import { defaultChatId } from '../../../server/models/chat';
import {
  CHANGE_CHAT,
  START_CHATS_LOADING,
  SUCCESS_CHATS_LOADING,
  ERROR_CHATS_LOADING,
  START_GET_CHAT,
  SUCCESS_GET_CHAT,
  ERROR_GET_CHAT,
  START_ADD_CHAT,
  SUCCESS_ADD_CHAT,
  ERROR_ADD_CHAT } from '../actions/chats_actions.js';

const initialStore = {
  chatId: defaultChatId, 
  chats: {},
  isLoading: false
};

export default function chatsReducer(store = initialStore, action) {
  switch(action.type) {
    case CHANGE_CHAT:
      return update(store, {
        chatId: {$set: action.chatId}
      });
      break;

    case START_CHATS_LOADING: 
      return update (store, {
        isLoading : { $set : true },
      });
      break;

    case SUCCESS_CHATS_LOADING: 
      const chats = {};
      action.payload.forEach(chat => {
        const { title, user, bot } = chat;
        chats[chat._id] = { title , user, bot };
      });

      return update(store, {
        chats: { $set: chats },
        isLoading: { $set: false },
      });
      break;

    case ERROR_CHATS_LOADING:
      return update (store, {
        isLoading: { $set: false },
      });
      break;

    case SUCCESS_GET_CHAT: 
      const chat = {
        _id:    action.payload._id,
        title:  action.payload.title,
        user:   action.payload.user,
        bot:    action.payload.bot
      };

      return update(store, {
        chat: { $set: chat },
      });
      break;

    case SUCCESS_ADD_CHAT: 
      return update(store, {
        chats: { 
          $merge: { 
            [action.payload._id]: { 
                title: action.payload.title,
                user: action.payload.user,
                bot: action.payload.bot
            } 
          } 
        }
      });
      break;
      
    default:
      return store;
      break;
  };
};