import update  from 'react-addons-update'
import { ADD_CHAT } from '../actions/chat_actions.js'

let initialStore = {
    chats: {
        1: { title: "Darth Vader"},
        2: { title: "Support"},
        3: { title: "Friend"},
    }
}

export default function chatReducer(store = initialStore, action) {
    switch(action.type) {
        case ADD_CHAT: {
            console.log(store.chats)
            // let chatId = Object.keys(store.chats).length + 1;

            return update(store, {
                chats: { 
                    $merge: { 
                        [action.chatId]: {
                            title: action.title 
                            // messagesList: [] 
                        } 
                    } 
                }
            });
        }
        default: 
            return store
    }    
}