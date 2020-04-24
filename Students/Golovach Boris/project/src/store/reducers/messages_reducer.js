import update from 'react-addons-update'
//import ACTIONS
import { SEND_MSG } from '../actions/messages_actions';
import {
   START_CHATS_LOADING,
   SUCCESS_CHATS_LOADING,
   ERROR_CHATS_LOADING,
} from '../actions/chats_actions';

const initialStore = {
    messages: {},
    isLoading: false
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            console.log('SEND_MSG',action)
            return update(store, {
                messages: {
                    $merge: { 
                        [action.messageId]: {
                            user: action.sender, 
                            text: action.text,
                            chatId: action.chatId
                        } 
                    }
                },
            });
        }
        case START_CHATS_LOADING: {
            return update(store, {
               isLoading: { $set: true },
            });
        }
        case SUCCESS_CHATS_LOADING: {
            console.log('SUCCESS_CHATS_LOADING',action.payload.entities.messages)
            return update(store, {
                messages: { $set: action.payload.entities.messages },
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