import update from 'react-addons-update'
//import ACTIONS
import { SEND_MESSAGE } from '../actions/messages_actions';
import { SUCCESS_CHATS_LOADING } from "../actions/chats_actions";
import { ADD_CHAT } from "../actions/chats_actions";

let initialStore = {
    chats: {},
    isLoading: true,
}

export default function chatReducer(store = initialStore, action) {
    switch(action.type) {
        case ADD_CHAT: {
            let chatId = Object.keys(store.chats).length + 1;
            return update(store, {
                chats: { 
                    $merge: { 
                        [chatId]: { 
                            title: action.title, 
                            messagesList: []
                        } 
                    } 
                }
            });
        }
        case SUCCESS_CHATS_LOADING: {
            return update(store, {
                chats: { $set: action.payload.entities.chats },
                isLoading: { $set: false },
            });
        }
        default: {
            return store
        }
    }
}