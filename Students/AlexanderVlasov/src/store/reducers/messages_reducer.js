import update from 'react-addons-update';

import { SEND_MSG } from '../actions/messages_action.js';
import { ADD_CHAT, DEL_CHAT } from '../actions/chats_action.js';

const initialStore = {
    messages: {
    }
}

export default function msgReducer(store = initialStore, action) {
    switch (action.type) {
        case SEND_MSG: {
            return update(store, {
                messages: {
                    [action.chatId] : {
                        $merge: {
                            [action.messageId]: {
                                user: action.sender, 
                                text: action.text
                            }
                        }
                    }
                }
            })
        }
        case ADD_CHAT: {
            return update(store, {
                messages: {
                    $merge: { [action.chatId]: {  } }
                }
            })
        }
        case DEL_CHAT: {
            let cloneStore = Object.assign({}, store);
            delete cloneStore.messages[action.chatId];
            return cloneStore;
        }
        default: return store;
    }
}