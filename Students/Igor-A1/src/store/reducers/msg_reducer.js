import update from 'react-addons-update';

import { 
  START_MESSAGES_LOADING,
  SUCCESS_MESSAGES_LOADING,
  ERROR_MESSAGES_LOADING,
  START_MESSAGE_SEND,
  SUCCESS_MESSAGE_SEND,
  ERROR_MESSAGE_SEND } from '../actions/messages_actions.js';

const initialStore = {
  msgs: {},
  isLoading: false
};

export default function msgReducer(store = initialStore, action) {
  switch(action.type) {
    case START_MESSAGES_LOADING: 
      return update (store, {
        isLoading : { $set : true },
      });
      break;

    case SUCCESS_MESSAGES_LOADING: 
      const msgs = {};
      action.payload.forEach(msg => {
        const { sender, text } = msg;
        msgs[msg._id] = { sender, text };
      });

      return update(store, {
        msgs: { $set: msgs },
        isLoading: { $set: false },
      });
      break;

    case ERROR_MESSAGES_LOADING:
      return update (store, {
        isLoading: { $set: false },
      });
      break;

    case SUCCESS_MESSAGE_SEND: 
      return update(store, {
        msgs: { 
          $merge: { 
            [action.payload._id]: { 
                sender: action.payload.sender,
                text: action.payload.text
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