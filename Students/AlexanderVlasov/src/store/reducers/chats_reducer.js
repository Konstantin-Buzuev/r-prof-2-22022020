import update from 'react-addons-update';

import { ADD_CHAT, DEL_CHAT } from '../actions/chats_action.js';

const initialStore = {
    chats: {
    }
}

export default function chatsReducer(store = initialStore, action) {
    switch (action.type) {
        case ADD_CHAT: {
            return update(store, {
                chats: {
                    $merge: {
                        [action.chatId] : {
                            title: action.title
                        }
                    }
                }
            })
        }
        case DEL_CHAT: {
            let cloneStore = Object.assign({}, store);
            delete cloneStore.chats[action.chatId];
            return cloneStore;
        }
        default: return store;
    }
}