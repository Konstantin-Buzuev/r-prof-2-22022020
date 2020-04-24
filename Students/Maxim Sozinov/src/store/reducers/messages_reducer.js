import update from 'immutability-helper';

import { SEND_MSG, ADD_MSG } from '../actions/messages_actions.js';

const initialStore = {
   messages: {},
};

export default function msgReducer(store = initialStore, action) {
   switch (action.type) {
      case ADD_MSG:
      case SEND_MSG: {
         return update(store, {
            messages: {
               $merge: {
                  [action.messageId]: {
                     user: action.sender,
                     text: action.text,
                     chatId: action.chatId
                  }
               }
            }
         });
      }
      default:
         return store;
   }
}