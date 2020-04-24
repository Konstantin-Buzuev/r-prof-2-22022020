import update from 'immutability-helper';

import { 
   ADD_CHAT,
   START_CHATS_LOADING,
   SUCCESS_CHATS_LOADING,
   ERROR_CHATS_LOADING,
} from '../actions/chats_action.js';

const initialStore = {
   chats: {},
   defaultChat: null,
   isLoading: false,
};

export default function chatReducer( store = initialStore, action ) {
   switch ( action.type ) {
      case ADD_CHAT: {
         return update(store, {
            chats: {
               $merge: {
                  [action.chatId]:{
                     title: action.title,
                  }
               }
            }
         });
      }
      case START_CHATS_LOADING: { 
         return update(store, { 
            isLoading: { $set: true }, 
         }); 
     } 
     case SUCCESS_CHATS_LOADING: { 
         const chats = {}; 
         let defaultChat = null;
         action.payload.forEach( chat => {
             chats[chat._id] = {title: chat.title};
             if (!defaultChat) {
                 defaultChat = chat._id;
             }
         }); 
         return update(store, {
            defaultChat: { $set: defaultChat},
            chats: { $set: chats },
            isLoading: { $set: false },
         }); 
     } 
     case ERROR_CHATS_LOADING: { 
         return update(store, { 
             isLoading: { $set: false }, 
         }); 
     } 
      default:
         return store;
   }
}