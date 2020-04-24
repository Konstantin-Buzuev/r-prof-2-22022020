import update from 'react-addons-update'
//import ACTIONS
import { ADD_CHAT, DEL_CHAT } from '../actions/chats_actions.js'

let initialStore = {
    chats: {
        1: {
            title: 'Chat 1', 
            messagesList: []
        },
        2: {
            title: 'Chat 2', 
            messagesList: []
        },
        3: {
            title: 'Chat 3', 
            messagesList: []
        }
    }
}

export default function chatsReducer(store = initialStore, action) {
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
            })
        }
        case DEL_CHAT: {
            let newStore = JSON.parse(JSON.stringify(store));
            delete newStore.chats[action.chatId];
            return newStore;
        }
        default: {
            return store
        }
    }
}